const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ messages: 'all filed are required' })
  }

  const foundUser = await User.findOne({ email }).lean()
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ messages: 'Unauthorized' })
  }

  const match = await bcrypt.compare(password, foundUser.password)
  if (!match) return res.status(401).json({ messages: 'Unauthorized' })
  const userInfo = {
    _id: foundUser._id,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    roles: foundUser.roles,
    phone: foundUser.phone,
    user_id: foundUser.user_id,
    email: foundUser.email,
    basket: foundUser.basket,
    defaultAddress: foundUser.defaultAddress
  }

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
  res.json({ token: accessToken })

}

const register = async (req, res) => {

  const { firstName, lastName, password, email, phone, user_id } = req.body
  if (!firstName || !lastName || !password || !email) {
    return res.status(400).json({ messages: 'all filed are required' })
  }

  const duplicate = await User.findOne({ email: email }).lean()
  if (duplicate) {
    return res.status(409).json({ messages: 'Username already exist' })
  }

  const hashPwd = await bcrypt.hash(password, 10)
  try {
    const user = await User.create({ password: hashPwd, firstName, lastName, email, phone, user_id });
    if (user) {
      return res.status(201).json({ messages: `New user ${user.firstName} created ` })
    }
    else {
      return res.status(400).json({ messages: 'invalid user received' })
    }
  } catch (err) {
    console.log('faild to create new user', err);
  }

}




module.exports = { login, register }