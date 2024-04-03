const Product=require("../models/Product")

const getAllProduct=async(req,res)=>{

    const Products=await Product.find()
    if(!Products?.length){
        return res.status(400).json({massage:'no Product'})
    }
    res.json(Products)
}
const creataNewProduct=async(req,res)=>{
    const{name,description,price,quantity}=req.body
    
    if(!name||!price||!req.files){
        return res.status(400).json({message:'filds are required'})
    }

    let imageURL=[]
    req.files.forEach(element => {
        imageURL.push(element.path)
    });
    const product=await Product.create({name,imageURL,description,price,quantity})
    if(product){
        return res.status(201).json(product)
    }
    else{
        return res.status(400).json({message:'invalid Product'}) 
    }
}
const updateProduct=async(req,res)=>{
    const{_id,name,description,price,quantity}=req.body 
    if(!_id||!name||!price){
        return res.status(400).json({message:'fields are required'})
    }
    const product=await Product.findById(_id).exec()
    if(!product){
        return res.status(400).json({message:'Product not found'})
    }
    const imageURL=[]
    req.files?.forEach(element => {
        imageURL.push(element.path)
    });
    product.name=name
    product.imageURL=imageURL.length>0?imageURL:product.imageURL
    product.price=price
    product.description=description
    product.quantity=quantity
    const updateProduct=await product.save()

    res.json(updateProduct)
}
const deletProduct=async(req,res)=>{
    const{_id}=req.body
    const product=await Product.findById(_id).exec()
    if(!product){
        return res.status(201).json({message:'Product not found'})
    }
    const result=await product.deleteOne()
    res.json(result)
}
const getProductbyId = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id).lean()
    if (!product) {
        return res.status(400).json({ message: 'no product found' })
    }
    res.json(product)

}

module.exports={getProductbyId,getAllProduct,creataNewProduct,updateProduct,deletProduct}