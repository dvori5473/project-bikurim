const Order = require("../models/Order")
const Product = require("../models/Product")

const getAllOrders = async (req, res) => {
    let Orders = {}
        Orders = await Order.find({
            status:{$in:['Ordered','In Process','Shipped']}
        }).lean()
    if (!Orders?.length) {
        return res.status(400).json({ massage: 'no Order' })
    }
    res.json(Orders)
}

const getOrderbyId = async (req, res) => {
    const { id } = req.params
    const Orders = await Order.find({ customerID: id }).sort({createdAt:-1})
    if (!Orders) {
        return res.status(400).json({ massage: 'no Order' })
    }
    res.json(Orders)
}
const creataNewOrder = async (req, res) => {
    const { address } = req.body
    if (!address) {
        return res.status(400).json({ message: 'filds are required1' })
    }

    // req.user.basket.products.forEach(p => {if (!p.product_id||!p.quantity)
    //     return res.status(400).json({message:'filds are required2'})
    // });

    const order = await Order.create({ customerID: req.user._id, products: req.user.basket.products, payment: req.user.basket.payment, address: address })

    if (order) {
        // const Products = await Product.find().lean()
        // if (!Products?.length) {
        //     return res.status(400).json({ massage: 'no Products' })
        // }
        order.products.forEach(async p => {
            const product = await Product.findById(p.product_id)
            if (!product) {
                return res.status(400).json({ message: 'product not found' })
            }
            product.quantity=product.quantity-p.quantity
            const updateProductr = await product.save() 
        })
        return res.status(201).json({ message: 'new Order created' })
    }
    else {
        return res.status(400).json({ message: 'invalid Order' }) 
    }

}
const updateOrder = async (req, res) => { 
    const { _id, status } = req.body
    if (!_id || !status) {
        return res.status(400).json({ message: 'fields are required' }) 
    }
    const order = await Order.findById(_id).exec()
    if (!order) {
        return res.status(400).json({ message: 'Order not found' }) 
    }
    order.status = status
    const updateOrder = await order.save()

    res.json(updateOrder)
}

const deletOrder = async (req, res) => { 
    const { _id } = req.body
    const order = await Order.findById(_id).exec()
    if (!order) {
        return res.status(201).json({ message: 'Order not found' })
    }
    const result = await order.deleteOne()
    res.json(result)
}


module.exports = { getAllOrders, creataNewOrder, updateOrder, deletOrder, getOrderbyId }