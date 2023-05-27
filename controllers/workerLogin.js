import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import workerSchema from "../models/worker.js";
import mongoose from "mongoose";

const secret = 'test';

export const signin = async (req, res) => {
  const {password} = req.body;
  try {
    const oldUser = await workerSchema.findOne({ password });

    if (!oldUser) return res.status(404).json({ message: "Worker doesn't exist" });
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

// function generateP() {
//     var pass = '';
//     var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
//             'abcdefghijklmnopqrstuvwxyz0123456789@#$';
      
//     for (let i = 1; i <= 8; i++) {
//         var char = Math.floor(Math.random()
//                     * str.length + 1);
          
//         pass += str.charAt(char)
//     }
      
//     return pass;
// }

export const signup = async (req, res) => {
  const { username, password } = req.body;
  const post = req.body;

  try {
    const oldUser = await workerSchema.findOne({ password });

    if (oldUser) return res.status(400).json({ message: "Worker already exists" });

    const result = await workerSchema.create(post);

    const token = jwt.sign( { username: result.username, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

export const getApprovedPosts = async (req, res) => {
  try{
      const ApprovedWorkers = await workerSchema.find();
      res.status(200).json(ApprovedWorkers);

  }catch(err){
      res.status(404).json({message: err.message})
  }
};

export const getWorker = async (req, res) => {
  try{
      const {username } = req.params;
      const worker = await workerSchema.find();
      res.status(200).json(worker);

  }catch(err){
      res.status(404).json({message: err.message})
  }
};

export const deleteWorker= async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);

  await workerSchema.findByIdAndRemove(id);

  res.json({ message: "Worker deleted successfully." });
}


export const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, cnic, work, contact, salary, description, availability} = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { firstName, lastName, cnic, work, contact, salary, description, availability, _id: id };

  await workerSchema.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}