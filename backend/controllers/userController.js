const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//Register new user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, organisation, role } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    organisation,
    role
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      organisation: user.organisation,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
 
})

//Authenticate a user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      organisation: user.organisation,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// GET ALL USERS
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(req.allusers)

})

// GET ONE 
const getOneUser = asyncHandler(async (req, res) => {
  // get only one user from id that we recieve from middleware
  console.log(req.params.id)
  const user = await User.findById(req.params.id)

  res.status(200).json(user)
})

// DELETE
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  // Make sure the admin logged in
  if (!req.user.role == 'admin') {
    res.status(401)
    throw new Error('Admin needed')
  }

  await user.remove()

  res.status(200).json({ id: req.params.id, msg:"user deleted" })
 
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  getOneUser,
}
