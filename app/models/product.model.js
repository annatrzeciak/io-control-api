module.exports = (mongoose) => {
  const productSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId },
    details_id: { type: String },
    name: { type: String, required: true },
    name_pl: { type: String, required: false },
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
  });
  productSchema.virtual("details", {
    ref: "det",
    localField: "details_id",
    foreignField: "_id",
    justOne: true,
  });
  productSchema.method("toJSON", function () {
    const { __v, _id, id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", productSchema);
  return Product;
};
