const mongoose=require('mongoose')
const stepSchema=require("./stepSchema")
const taskSchema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    complete:{
        type:Boolean,
        default:false
    },
    importent:{
        type:Boolean,
        default:false
    },
    range:{
        type:Number,
        min:0,
        max:5,
        immutable:true
    },
    tags:{
        type:[String]
    },
    type:String,
    icon:{
        type:String,
        maxLength:7
    },
    taskDate:{
        type:mongoose.Schema.Types.Date,
        default:()=>new Date()+7*24*60*60*1000
    },
    location:{
        street:String,
        city:String,
        building:Number
       },
    status:{
           type:String,
           enum:["aslinged","In process","complete","closed"],
           default:"aslinged"
    },
    userHM:{
           type:mongoose.Schema.Types.ObjectId,
           required:true,
           ref:"UserHM"
    },
    step:[stepSchema]
},{
      timestamps:true
    }
)
module.exports=mongoose.model('Task',taskSchema)