const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req,res) => {
   const { name, email, password, pic } = req.body;

   if (!name || !email || !password) {
       req.status(400);
       throw new Error("Please Enter all the Fields");
   }
   const userExists = await User.findOne({ email });

   if(userExists) {
       res.status(400);
       throw new Error("User Already Exists");
   }

   const user = await User.create({
       name,
       email,
       password,
       pic,
   });

   if(user) {
       res.status(201).json({
           _id: user._id,
           name: user.name,
           email: user.email,
           pic: user.pic,
           token: generateToken(user._id),
       });
   } else {
       res.status(400);
       throw new Error("Failed to create new user");
   }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }  else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
});

module.exports = { registerUser, authUser };