module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        address: String,
        published: Boolean,
        phone: Number,
        image: String
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Tutorial = mongoose.model("tutorial", schema);
    return Tutorial;
  };