import feedback from "../models/feedback.js";

export const createFeedback = async (req, res) => {
    const post = req.body;
    const newPost = new feedback(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message: err.message})
    }
};

export const getFeedbacks = async (req, res) => {
    try{
        const feedbacks = await feedback.find();
        res.status(200).json(feedbacks);
  
    }catch(err){
        res.status(404).json({message: err.message})
    }
  };