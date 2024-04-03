const mongoose=require('mongoose')

const addressSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }, 
    street:{
        type:String,
        required:true
    },
    houseNumber:{
        type:Number,
        required:true
    },
    apartment:{
        type:Number
        
    },
    postalCode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
  
},{
      timestamps:true
    }
)
module.exports = addressSchema