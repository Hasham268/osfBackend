import mongoose from 'mongoose';
import "./user.js"

const OrderSchema = mongoose.Schema({
    userName: String,
    userContact: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    worker: {type: mongoose.Schema.Types.ObjectId, required: true},
    firstName: String,
    lastName: String,
    contact: Number,
    work: String,
    address: String,
    status: String,
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;

