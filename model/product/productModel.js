const { Schema, model, Types } = require('mongoose');
const { CommentsSchema } = require('../comments/commentsModel');



const ProductSchema = new Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: [Types.ObjectId], ref: "category", required: true },
    comments: { type: [CommentsSchema], default: [] },
    like: { type: [Types.ObjectId], default: [] },
    deslike: { type: [Types.ObjectId], default: [] },
    bookmark: { type: [Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, required: true },
    format: { type: String, },
    supplier: { type: String, ref: 'user', required: true },
    feature: {
        type: Object, default: {
            length: '',
            height: '',
            width: '',
            weight: '',
            colors: [],
            model: [],
            made_in: ''
        }
    },
},
    {
        toJSON: {
            virtuals: true
        }
    }
)
ProductSchema.index({ text: 'text', short_text: 'text', title: 'text' })

const ProductsModel = model('product', ProductSchema)
module.exports = {
ProductsModel
}
