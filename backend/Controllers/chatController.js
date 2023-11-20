// import { Chat } from "../Models/chatModel.js";

// export const access = async (req, res, next) => {
//     const {userID} = req.body;
//     if (!userID){
//         return res.status(400).send('no id given')
//     }
//     let chat = await Chat.find({
//         $and: [
//             {users: {$elemMatch: {$eq: req.user._id}}},
//             {users: {$elemMatch: {$eq: userID}}}
//         ]
//     })

//     chat = await User.populate(isChat, {
//         path: "latestMessage.sender",
//         select: "name email"
//     })

//     if (chat.length > 0){
//         res.send(chat[0])
//     } else {
//         let chatData = {
//             chatName: "sender",
//             users: [req.user._id, userID]
//         }
//         try{
//             const createdChat = await Chat.create({chatData})
//             const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password")

//             res.status(200).send(fullChat)
//         } catch(err) {
//             console.error(err);
//             res.status(400).send(err.message)
//           }
//     }
// }

// export const fetchChats = async (req, res) => {
//     try{
//         Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
//         // .then(result => res.send(result))
//         .populate("users", "-password")
//         .populate("latestMessage")
//         .sort({updatedAt: -1})
//         .then(async (results) => {
//             results = await User.populate(results, {
//                 path: "latestMessage.sender",
//                 select: "name email"
//             })
//             res.status(200).send(results);
//         })

//     } catch(err) {
//         console.error(err);
//         res.status(400).send(err.message);
//       }
// }