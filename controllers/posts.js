import mongoose from 'mongoose';

import WorkerRegistration from "../models/workerRegisteration.js";

export const getPosts = async (req, res) => {
    try{
        const WorkerRegistrations = await WorkerRegistration.find();
        res.status(200).json(WorkerRegistrations);

    }catch(err){
        res.status(404).json({message: err.message})
    }
};

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new WorkerRegistration(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message: err.message})
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await WorkerRegistration.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}