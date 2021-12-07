module.exports = (mongoose) => {
  const productSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId },
    name: { type: String, required: true },
    namePl: { type: String, required: false },
    cat: { type: String, required: true },
    reporturl: { type: String, required: false },
    photo: { type: String, required: false },
    added: { type: Date, default: Date.now },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    updatedAt: { type: Date, required: false },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "detail",
    },
  });
  productSchema.method("toJSON", function () {
    const { __v, _id, id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", productSchema);
  return Product;
};
