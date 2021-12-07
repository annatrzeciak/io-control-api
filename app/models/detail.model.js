module.exports = (mongoose) => {
  const detailSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    energyKcal: { type: Object, required: false },
    energyKj: { type: Object, required: false },
    fat: { type: Object, required: false },
    satfat: { type: Object, required: false },
    sugars: { type: Object, required: false },
    carbohydrate: { type: Object, required: false },
    protein: { type: Object, required: false },
    sodium: { type: Object, required: false },
    salt: { type: Object, required: false },
    water: { type: Object, required: false },
    waterDr: { type: Object, required: false },
    alcohol: { type: Object, required: false },
    starch: { type: Object, required: false },
    oligosaccharide: { type: Object, required: false },
    fibre: { type: Object, required: false },
    nsp: { type: Object, required: false },
    freesugars: { type: Object, required: false },
    glucose: { type: Object, required: false },
    galactose: { type: Object, required: false },
    fructose: { type: Object, required: false },
    sucrose: { type: Object, required: false },
    maltose: { type: Object, required: false },
    lactose: { type: Object, required: false },
    monos: { type: Object, required: false },
    poly: { type: Object, required: false },
    n3poly: { type: Object, required: false },
    n6poly: { type: Object, required: false },
    trans: { type: Object, required: false },
    cholesterol: { type: Object, required: false },
    potassium: { type: Object, required: false },
    chloride: { type: Object, required: false },
    calcium: { type: Object, required: false },
    phosphorus: { type: Object, required: false },
    magnesium: { type: Object, required: false },
    iron: { type: Object, required: false },
    zinc: { type: Object, required: false },
    copper: { type: Object, required: false },
    selenium: { type: Object, required: false },
    iodine: { type: Object, required: false },
    vita: { type: Object, required: false },
    retinol: { type: Object, required: false },
    carotene: { type: Object, required: false },
    vitd: { type: Object, required: false },
    vite: { type: Object, required: false },
    vitk: { type: Object, required: false },
    thiamin: { type: Object, required: false },
    riboflavin: { type: Object, required: false },
    niacineqv: { type: Object, required: false },
    niacin: { type: Object, required: false },
    tryptophan: { type: Object, required: false },
    pantothenate: { type: Object, required: false },
    vitb6: { type: Object, required: false },
    folate: { type: Object, required: false },
    vitb12: { type: Object, required: false },
    biotin: { type: Object, required: false },
    vitc: { type: Object, required: false },
    gi: { type: Object, required: false },
    gl: { type: Object, required: false },
    caffeine: { type: Object, required: false },
    measures: { type: Array, required: false },
    measuresLabel: { type: String, required: false },
    measuresId: { type: String, required: false },
    healthLabels: { type: Object, required: false },
  });
  detailSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Detail = mongoose.model("detail", detailSchema);
  return Detail;
};
