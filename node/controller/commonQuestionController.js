const CommonQuestion=require("../models/CommonQuestion")

const getAllCommonQuestion=async(req,res)=>{

    const CommonQuestions=await CommonQuestion.find()
    if(!CommonQuestions?.length){
        return res.status(400).json({massage:'no CommonQuestion'})
    }
    res.json(CommonQuestions)
}
const creataNewCommonQuestion=async(req,res)=>{
    const{question,answer}=req.body
    if(!question||!answer){
        return res.status(400).json({message:'filds are required'})
    }
    const commonQuestion=await CommonQuestion.create({question,answer})
    if(commonQuestion){
        return res.status(201).json({message:'new CommonQuestion created'})
    }
    else{
        return res.status(400).json({message:'invalid CommonQuestion'}) 
    }
}
const updateCommonQuestion=async(req,res)=>{
    const{_id,question,answer}=req.body
    if(!_id||!question||!answer){
        return res.status(400).json({message:'fields are required'})
    }
    const commonQuestion=await CommonQuestion.findById(_id).exec()
    if(!commonQuestion){
        return res.status(400).json({message:'CommonQuestion not found'})
    }
    commonQuestion.question=question
    commonQuestion.answer=answer
    const updateCommonQuestion=await commonQuestion.save()

    res.json(`'${updateCommonQuestion.question}' updated`)
}
const deletCommonQuestion=async(req,res)=>{
    const{_id}=req.body
    const commonQuestion=await CommonQuestion.findById(_id).exec()
    if(!commonQuestion){
        return res.status(201).json({message:'CommonQuestion not found'})
    }
    const result=await commonQuestion.deleteOne()
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

module.exports={getAllCommonQuestion,creataNewCommonQuestion,updateCommonQuestion,deletCommonQuestion}