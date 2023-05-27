import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminSchema from "../models/admin.js";

import mongoose from "mongoose";

const secret = 'test';

export const signin = async (req, res) => {
  const {password} = req.body;
  try {
    const oldUser = await adminSchema.findOne({ password });

    if (!oldUser) return res.status(404).json({ message: "Admin doesn't exist" });
    if (password === oldUser.password){
        const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });   
    }else{
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


// export const signup = async (req, res) => {
//     const { username, password } = req.body;
//     const post = req.body;
  
//     try {
//       const oldUser = await adminSchema.findOne({ password });
  
//       if (oldUser) return res.status(400).json({ message: "Worker already exists" });
  
//       const result = await adminSchema.create(post);
  
//       const token = jwt.sign( { username: result.username, id: result._id }, secret, { expiresIn: "1h" } );
  
//       res.status(201).json({ result, token });
//     } catch (error) {
//       res.status(500).json({ message: "Something went wrong" });
      
//       console.log(error);
//     }
//   };