const { Schema, Types, model, default: mongoose } = require('mongoose');


const ProductSchema = new Schema({
    productID: { type: Types.ObjectId, ref: 'product' },
    count: { type: Number, default: 1 }

})
const basketSchema = new Schema({
    products: { type: [ProductSchema], default: [] },
})

const userSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, unique: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true, unique: true },
    password: { type: String },
    confirm_password: { type: String },
    otp: {
        type: Object, default: {
            code: 0,
            expireIn: 0
        }
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    token: { type: String, dafault: '' },
    like: { type: [Types.ObjectId], default: [] },
    deslike: { type: [Types.ObjectId], default: [] },
    bookmark: { type: [Types.ObjectId], default: [] },
    role: { type: String, default: 'USER' },
    profile: { type: String, default: 'image.png' },
    products: { type: [Types.ObjectId], ref: 'product', default: [] },
    token: { type: String, default: '' },
    basket: { type: basketSchema,default:{} ,ref:'product'}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})





userSchema.index({ mobile: "text", username: "text", last_name: "text", first_name: 'text' })

const UserModel = model('user', userSchema)

module.exports = {
    UserModel
}