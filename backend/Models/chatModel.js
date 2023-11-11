import mongoose from 'mongoose';
const chatModel = mongoose.Schema({
    chatHeadline: {type: String, trim: true, required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: User}],
    admin: {type: mongoose.Schema.Types.ObjectId, ref: User},
    messages:[{type: String, trim: true}],
    latestMessage: {type: mongoose.Schema.Types.ObjectId, ref: Message},

}, {timestamps: true});

export const Chat = mongoose.model("Chat", chatModel);