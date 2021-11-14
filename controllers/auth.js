const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require("../models/user");


exports.postSignUp = async (req, res, next) => {
  const {name, email, password} = req.body

  const user = await User.findOne({email: email});

  if(user) {
    res.status(400).json({message: 'Email already exists'})
  }
  try {
    const newUser = await User.create({
      name,
      email,
      password
    });

    res.status(200).json({
      message: "User created succesfully",
      data: newUser,
    })
  } catch(error) {
      res.status(400).json({
        message: error.message,
      })
  }
}

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (!user) {
    res.status(404).json({message: "User Does not exiist"})
  }

  try {
    const comparePassword = await bcrypt.compare(password, user.password)
    
    if (!comparePassword) {
      res.status(500).json({message: "Password doesn't match"});
    }

    const token = jwt.sign({user}, process.env.JWT_SECRET);
    res.status(200).json({token})

  } catch (error) {
    res.status(400).json({message: error.message});
  }


}