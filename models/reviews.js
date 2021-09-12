const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    dojo: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    });

const Reviews = mongoose.model("reviews", ReviewSchema);
module.exports = Reviews;
