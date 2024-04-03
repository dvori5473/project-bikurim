const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    body:{
        type:String,
        required:true
    }
},{
      timestamps:true
    }
)
module.exports=mongoose.model('Message',messageSchema)