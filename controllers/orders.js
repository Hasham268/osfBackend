import Order from '../models/orders.js';
import mongoose from "mongoose";

export const saveOrder = async (req, res) => {
    const order = req.body; 
    const newOrder = new Order(order);
    try{
      await newOrder.save();
      res.status(201).json(newOrder);
    }catch(err){
        res.status(409).json({message: err.message})
    }
  
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status} = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { status, _id: id };

  await Order.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const getOrders = async (req, res) => {
  try{
      const  { id } = req.params;
      const order = await Order.find({user: id});
      res.status(200).json(order);

  }catch(err){
      res.status(404).json({message: err.message})
  }
};

export const getAllOrders = async (req, res) => {
  try{
   
      const order = await Order.find();
      res.status(200).json(order);

  }catch(err){
      res.status(404).json({message: err.message})
  }
};

export const getAppointments = async (req, res) => {
  try{
      const  { id } = req.params;
      const order = await Order.find({worker: id});
      res.status(200).json(order);

  }catch(err){
      res.status(404).json({message: err.message})
  }
};

export const deleteOrder= async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No order with id: ${id}`);

  await Order.findByIdAndRemove(id);

  res.json({ message: "Order deleted successfully." });
}


