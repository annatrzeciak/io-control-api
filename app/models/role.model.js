module.exports = (mongoose) => {
  const roleSchema = mongoose.Schema({
    name: String,
  });

  roleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
  });

  const Role = mongoose.model("role", roleSchema);
  return Role;
};
