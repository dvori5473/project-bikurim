const mongoose=require('mongoose')

const commonQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
},{
      timestamps:true
    }
)
module.exports=mongoose.model('CommonQuestion',commonQuestionSchema)