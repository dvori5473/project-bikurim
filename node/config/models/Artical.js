const mongoose=require('mongoose')
const articalSchema=new mongoose.Schema({
    titel:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    active:{
        type:Boolean,
        default:false
    },
    auther:{
        type:String
    },
    category:{
        type:String
    }
},{
    timestamps:true
}
)
module.exports=mongoose.model('Artical',articalSchema)