const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = mongoose => {
  const userSchema = mongoose.Schema(
    {
      displayName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      password: {
        type: String,
        trim: true,
        required: true,
        select: false,
        minLength: 7
      },
      phone: {
        type: String,
        trim: true
      },
      avatar: {
        type: String,
        trim: true
      },
      role: {
        type: String,
        trim: true,
        default: "user"
      },
      approved: {
        type: Boolean,
        default: false
      },
      createdAt: { type: Date, default: Date.now },
      approvedAt: { type: Date }
    },
    {
      versionKey: false
    }
  );

  userSchema.pre("save", function(next) {
    if (this.password !== undefined)
      this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  });

  userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", userSchema);
  return User;
};
