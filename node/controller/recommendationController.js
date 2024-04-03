const Recommendation=require("../models/Recommendation")

const getAllRecommendation=async(req,res)=>{

    const Recommendations=await Recommendation.find()
    if(!Recommendations?.length){
        return res.status(400).json({massage:'no Recommendation'})
    }
    res.json(Recommendations)
}
const creataNewRecommendation=async(req,res)=>{
    const{userID,content}=req.body
    if(!userID||!content){
        return res.status(400).json({message:'filds are required'})
    }
    const recommendation=await Recommendation.create({userID,content})
    if(recommendation){
        return res.status(201).json({message:'new Recommendation created'})
    }
    else{
        return res.status(400).json({message:'invalid Recommendation'}) 
    }
}
const deletRecommendation=async(req,res)=>{
    const{_id}=req.body
    const recommendation=await Recommendation.findById(_id).exec()
    if(!recommendation){
        return res.status(201).json({message:'Recommendation not found'})
    }
    const result=await recommendation.deleteOne()
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

module.exports={getAllRecommendation,creataNewRecommendation,deletRecommendation}