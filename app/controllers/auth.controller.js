const debug = require("debug")("auth:controller");
const config = require("../../config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    debug("Passwords do not match");
    res.status(400).send({
      message: "Passwords do not match",
    });
    return;
  }
  const { email, password, displayName, avatar, phone } = req.body;
  const user = new User({
    email,
    password: bcrypt.hashSync(password, 8),
    displayName,
    avatar,
    phone,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      accessToken: token,
    });
  });
};

exports.user = (req, res) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, config.SECRET);
    } catch (e) {
      return res.status(401).send("unauthorized");
    }
    const userId = decoded.id;
    User.findOne({ _id: userId })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        const {
          displayName,
          email,
          phone,
          avatar,
          roles,
          approved,
          createdAt,
        } = user;

        return res.status(200).send({
          user: {
            email,
            displayName,
            phone,
            avatar,
            roles: roles.map((role) => role.name),
            approved,
            createdAt,
          },
        });
      });
  }
  return res.status(500);
};