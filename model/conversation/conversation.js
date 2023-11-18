const { Schema, Types, model } = require('mongoose');

const messagesSchema = new Schema({
    sender: { type: Types.ObjectId, ref: 'user' },
    message: { type: String },
    dateTime: { type: String }
})
const locationSchema = new Schema({
    sender: { type: Types.ObjectId, ref: 'user' },
    location: { type: Object, default: {} },
    dateTime: { type: String }

})
const roomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    messages: { type: [messagesSchema], default: [] },
    locations: { type: [locationSchema], default: [] }

})
const ConversationSchema = new Schema({
    title: { type: String, required: true },
    endpoint: { type: String, required: true, unique: true },
    rooms: { type: [roomSchema], default: [] },
})

const ConverSationModel = model('conversation', ConversationSchema)

module.exports = {
    ConverSationModel
}