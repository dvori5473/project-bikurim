const mongoose=require("mongoose");
const stepSchema=new mongoose.Schema({
    titel:{
        type:String,
        required:true
    },
    comments:String
},{
    timestamps:true
})
module.exports=stepSchema