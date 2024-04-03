const mongoose=require('mongoose')
const userHMSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        lowercase:true
    },
    phon:{
        type:String
    },
    roles:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    
    active:{
        type:Boolean,
        default:false
    },
},{
      timestamps:true
    }
)
module.exports=mongoose.model('UserHM',userHMSchema)