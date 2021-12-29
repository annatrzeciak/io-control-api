module.exports = (mongoose) => {
  const calculationSchema = mongoose.Schema({
    date: { type: String },
    addedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    meal: { type: Number, required: true },
    products: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "product" },
        count: { type: Number, required: true, default: 100 },
      },
    ],
    userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  });

  calculationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object._id = _id;
    return object;
  });

  const Calculation = mongoose.model("calculation", calculationSchema);
  return Calculation;
};
