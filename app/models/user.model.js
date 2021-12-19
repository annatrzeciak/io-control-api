module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      displayName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        trim: true,
        required: true,
        minLength: 7,
      },
      phone: {
        type: String,
        trim: true,
      },
      avatar: {
        type: String,
        trim: true,
        default: function () {
          if (this.displayName) {
            return `https://avatars.dicebear.com/api/initials/${this.displayName
              .trim()
              .replace(/ /g, "-")}.svg`;
          }
          return null;
        },
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role",
        },
      ],
      approved: {
        type: Boolean,
        default: false,
      },
      createdAt: { type: Date, default: Date.now },
      approvedAt: { type: Date },
    },
    {
      versionKey: false,
    }
  );

  userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
  });

  const User = mongoose.model("user", userSchema);
  return User;
};
