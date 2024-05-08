const bcrypt = require('bcrypt')
const User = require("../models/User")
const Product = require("../models/Product")
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {

    const Users = await User.find({}, { password: 0 }).lean()
    if (!Users?.length) {
        return res.status(400).json({ massage: 'no User' })
    }
    res.json(Users)

}
const creataNewUser = async (req, res) => {
    const { firstName, lastName, password, email, phone, user_id, basket } = req.body
    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ message: 'filds are required' })
    }
    const user = await User.find({ email: email }).lean()
    if (!user?.length) {
        const a = ['user', 'admin']
        const tmp = a.filter(x => x === roles)
        if (!tmp?.length && roles != undefined) {
            return res.status(400).json({ message: 'invalid User1' })
        }
        const hashPwd = await bcrypt.hash(password, 10)
        const user = await User.create({ firstName, lastName, password: hashPwd, email, phone, roles, active, user_id, basket })
        if (user) {
            return res.status(201).json({ message: 'new User created' })
        }
        else {
            return res.status(400).json({ message: 'invalid User2' })
        }
    }
    else {
        return res.status(400).json({ message: 'invalid user3' })
    }

}
const updateUser = async (req, res) => {
    const { _id, firstName, lastName, password, phone, roles, active, user_id } = req.body

    if (!_id || !firstName || !lastName) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const user = await User.findById(_id).exec()
    if (roles) {
        if (!(['user', 'admin'].find(r => r === roles))) {
            return res.status(400).json({ message: 'roles not valid' })
        }
    }

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    if (password) {
        const hashPwd = await bcrypt.hash(password, 10)
        user.password = hashPwd
    }
    user.active = active ? active : user.active
    user.roles = roles ? roles : user.roles
    user.firstName = firstName
    user.lastName = lastName
    user.phone = phone
    user.user_id = user_id
    const updateUser = await user.save()
    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken, updateUser: updateUser })

}

const updateBasket = async (req, res) => {

    const basket = req.body
    if (!basket) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const user = await User.findById(req.user._id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    user.basket = basket
    const updateUser = await user.save()

    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken, updateUser: updateUser })
}
const addProduct = async (req, res) => {
    const { _id, product_id, quantity, imageURL, description } = req.body
    if (!_id || !product_id || !quantity || !description) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    const product = await Product.findById(product_id).exec()
    if (!product) {
        return res.status(400).json({ message: 'product not found' })
    }
    if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Products quantity is not enough' })
    }

    const checkIfExist = (user.basket.products).find(p => {
        if (p.product_id == product_id) {
            p.quantity = p.quantity + quantity
        }
        return (p.product_id == product_id)
    })

    if (checkIfExist == undefined) {
        user.basket.products = [...user.basket.products, { product_id: product_id, quantity: quantity, description: description, imageURL: imageURL }]
    }
    user.basket.payment = user.basket.payment + (product.price * quantity)
    const updateUser = await user.save()

    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken })

}
const deletProduct = async (req, res) => {

    const { _id, product_id } = req.body
    if (!_id || !product_id) {
        return res.status(400).json({ message: 'fields are required' })
    }

    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(201).json({ message: 'User not found ' })
    }

    const product = await Product.findById(product_id).exec()
    if (!product) {
        return res.status(400).json({ message: 'product not found' })
    }

    const new_products = user.basket.products.filter(p => {
        if (p.product_id == product_id)
            user.basket.payment = user.basket.payment - (p.quantity * product.price)
        return p.product_id != product_id
    }
    )

    user.basket.products = new_products
    const updateUser = await user.save()
    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken })
}
const updateProductQuantity = async (req, res) => {
   
    const { _id, product_id, quantity } = req.body
    if (!_id || !product_id || !quantity) {
        return res.status(400).json({ message: 'fields are required' })
    }
    
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(201).json({ message: 'User not found ' })
    }
    
    const product = await Product.findById(product_id).exec()
    if (!product) {
        return res.status(400).json({ message: 'product not found' })
    }
    
    const new_products = user.basket.products.map(p => {
        if (p.product_id == product_id) {

            user.basket.payment = user.basket.payment + product.price * (quantity - p.quantity)
            p.quantity = quantity

        }
        return p
    }
    )


    user.basket.products = new_products
    const updateUser = await user.save()
    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken })
}
const addDefaultAddress = async (req, res) => {
    
    const { _id, firstName, lastName, city, street, houseNumber, apartment, postalCode, phone } = req.body
    if (!_id || !firstName || !lastName || !city || !street || !houseNumber || !phone) {
        return res.status(400).json({ message: 'fields are required' })
    }
    
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.defaultAddress = { firstName, lastName, city, street, houseNumber: Number(houseNumber), apartment: Number(apartment), postalCode, phone }
    const updateUser = await user.save()

    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken })

}
const cleaningBasket = async (req, res) => {
    
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: 'fields are required' })
    }
    
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    
    user.basket.products = []
    user.basket.payment = 0
    
    const updateUser = await user.save()

    const userInfo = {
        _id: updateUser._id,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        roles: updateUser.roles,
        phone: updateUser.phone,
        user_id: updateUser.user_id,
        email: updateUser.email,
        basket: updateUser.basket,
        defaultAddress: updateUser.defaultAddress
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: accessToken })
}
const deletUser = async (req, res) => {
    
    const { id } = req.body
    if(!_id){
        return res.status(400).json({message:'field are required'})
    }
    
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(201).json({ message: 'User not found' })
    }
    const result = await user.deleteOne()
    res.json(`User '${user.firstName}' ID ${user.id} deleted`)
}
const getUserbyId = async (req, res) => {

    const { id } = req.params
    if (!_id) {
        return res.status(400).json({ message: 'field are required' })
    }

    const user = await User.findById(id).lean()
    if (!user) {
        return res.status(400).json({ message: 'no user found' })
    }
    res.json(user)

}

module.exports = { updateBasket, cleaningBasket, getAllUsers, creataNewUser, updateUser, deletUser, getUserbyId, addProduct, deletProduct, updateProductQuantity, addDefaultAddress }