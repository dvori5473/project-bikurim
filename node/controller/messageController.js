const Message=require("../models/Message")

const getAllMessage=async(req,res)=>{

    const Messages=await Message.find()
    if(!Messages?.length){
        return res.status(400).json({massage:'no Message'})
    }
    res.json(Messages)
}
const creataNewMessage=async(req,res)=>{
    const{userID,body}=req.body
    if(!userID||!body){
        return res.status(400).json({message:'filds are required'})
    }
    const message=await Message.create({userID,body})
    if(message){
        return res.status(201).json({message:'new Message created'})
    }
    else{
        return res.status(400).json({message:'invalid Message'}) 
    }
}
const deletMessage=async(req,res)=>{
    const{_id}=req.body
    const message=await Message.findById(_id).exec()
    if(!message){
        return res.status(201).json({message:'Message not found'})
    }
    const result=await message.deleteOne()
    res.json(result)
}
// const getUserbyId=async(req,res)=>{
//     const{id}=req.params
//     const user=await User.findById(id).lean()
//     if(!user){
//         return res.status(400).json({message:'no user found'})
//     }
//     res.json(user)

// }

module.exports={getAllMessage,creataNewMessage,deletMessage}