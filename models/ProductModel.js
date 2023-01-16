import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 128,
    },
    body: {
        type: String,
        required: true,
        min: 64,
        max: 4096,
    },
    price: {
        type: Number,
        required: true,
    },
    thumb: {
        type: String,
    },
    images: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now
    },
    floor: {
        type: Number,
    },
    square: {
        type: Number, 
        required: true,
    },
    rooms: {
        type: Number,
    },
    heating: {
        type: String,
        required: true,
    },
    furniture: {
        type: Boolean,
        required: true,
    },
    refit: {
        type: String,
    },
    infrastructure: {
        type: [String],
        required: false
    }

})

const productModel = mongoose.model('Product', productSchema);

export default productModel;