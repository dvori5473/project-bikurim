const mongoose=require('mongoose')

const recommendationSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
},{
      timestamps:true
    }
)
module.exports=mongoose.model('Recommendation',recommendationSchema)