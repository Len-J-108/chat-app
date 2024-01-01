import {Chat} from '../Models/chatModel.js';
import { User } from '../Models/userModel.js';

export const accessChat = async (req, res) => {
    try{
        const id = req.body.id;
        if (!id) {
            throw new Error('Something went wrong (accesschat)')
        }

        const condition = {$and: [
            {users: {elemMatch: {$eq: req.id}}},
            {users: {elemMatch: {$eq: id}}},
        ]}

        let chat = await Chat.find(condition)
            .populate("users", "-password")
            .populate("latestMessage")
        
        chat = await User.populate(chat, {
            path: 'latestmessage.sender',
            select: 'name email'
        });

        if (chat.length > 0) {
            res.send(chat[0]);
        } else {
            let chatData = {
                chatName: "sender",
                users: [req.id, id],
            }

            try{
                // const createdChat = await Chat.create(chatData);
                const createdChat = await Chat.insertOne(chatData);
                await createdChat.save();
                const fullChat = await Chat.findOne({_id: createdChat._id})
                  .populate("users", "-password");
                res.status(200).send(fullChat)
            } catch(err) {
                console.error(err);
                res.status(400).send(err.message);
              }
        }
        
    } catch(err) {
        console.error(err);
        res.status(400).send(err.message);
      }
}

export const fetchChats = async (req, res) => {
    try{
       Chat.find({users: {$elemMatch: {eq: req.id}}})
         .populate("users", "-password")
         .populate("latestMessage")
         .sort({updatedAt: -1})
         .then(async (results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name email",
            })
            res.status(200).send(results);
         })
    } catch(err) {
        console.error(err);
        res.status(400).send(err.message);
      }
}