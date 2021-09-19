const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TagSchema = new Schema(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Tag = mongoose.model("tags", TagSchema);
module.exports = Tag;
