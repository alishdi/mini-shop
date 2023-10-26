const { Schema, Types } = require('mongoose');
const AnswerSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user', required: true },
    comments: { type: String, required: true,ref:'comment' },
    show: { type: Boolean, default: false },
    isReplly: { type: Boolean, default: false },
},
    {
        timestamps: true
    })

const CommentsSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user', required: true },
    comments: { type: String, required: true },
    show: { type: Boolean, default: false },
    isReplly: { type: Boolean, default: true },
    answers: { type: [AnswerSchema], default: [] }
},
    {
        timestamps: true,
    })



module.exports = {
    CommentsSchema
}