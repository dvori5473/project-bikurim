const mongoose=require('mongoose')
const addressSchema=require("./Address")
const orderSchema=new mongoose.Schema({
    customerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    products:{
        type:[
            {
            product_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                require:true
            },
            quantity:{
                type:Number,    
                require:true
            },
            imageURL:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            }
        }
    ],
    require:true
    },
    status:{
        type: String,
        enum: ['Ordered','In Process','Shipped','Delivered'],
        default: "Ordered"
    },
    payment:{
        type:Number,
        require:true
    },
    address:{
        type:addressSchema,
        require:true
    }
},{
      timestamps:true
    }
)
module.exports=mongoose.model('Order',orderSchema)