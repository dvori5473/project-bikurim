const mongoose = require('mongoose')
const addressSchema=require("./Address")
const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String
    },
    roles: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: String,
    },
    basket: {
        products: {
            type: [
                {
                    product_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
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
            default: []
        },
        payment: {
            type: Number,
            default: 0 
        }
    },
    defaultAddress:{
       type:addressSchema
    }
}, {
    timestamps: true
}
)
module.exports = mongoose.model('User', userSchema)