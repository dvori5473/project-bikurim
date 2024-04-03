const Article=require("../models/Article")

const getAllArticle=async(req,res)=>{

    const Articles=await Article.find()
    if(!Articles?.length){
        return res.status(400).json({massage:'no Article'})
    }
    res.json(Articles)
}
const creataNewArticle=async(req,res)=>{
    const{title,body}=req.body
    if(!title||!body){
        return res.status(400).json({message:'filds are required'})
    }
    const article=await Article.create({title,body})
    if(article){
        return res.status(201).json({message:'new Article created'})
    }
    else{
        return res.status(400).json({message:'invalid Article'}) 
    }
}
const updateArticle=async(req,res)=>{
    const{_id,title,body}=req.body
    if(!_id||!title||!body){
        return res.status(400).json({message:'fields are required'})
    }
    const article=await Article.findById(_id).exec()
    if(!article){
        return res.status(400).json({message:'Article not found'})
    }
    article.title=title
    article.body=body
    const updateArticle=await article.save()

    res.json(`'${updateArticle.title}' updated`)
}
const deletArticle=async(req,res)=>{
    const{_id}=req.body
    const article=await Article.findById(_id).exec()
    if(!article){
        return res.status(201).json({message:'Article not found'})
    }
    const result=await article.deleteOne()
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

module.exports={getAllArticle,creataNewArticle,updateArticle,deletArticle}