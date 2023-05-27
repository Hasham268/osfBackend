import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import workerRoutes from "./routes/worker.js";
import orderRoutes from "./routes/orders.js";
import feedbackRoutes from "./routes/feedback.js";
import adminRoutes from "./routes/admin.js";
import sendMail from "./utils/mail.js";

const app = express();

app.use(bodyParser.json({limit: "30mb", extented: true}))
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/order', orderRoutes)
app.use('/worker', workerRoutes)
app.use('/feedback', feedbackRoutes)
app.use('/admin', adminRoutes)

app.post('/api/sendMail', async (req, res) => {
  const {username, password, email} = req.body;
  try{

    const send_to = email;
    const send_from = process.env.EMAIL_USER;
    const replyTo = email;
    const subject = "Worker Credentials"
    const message = `
    <h2>You are live on our website. Visit /WorkerLogin to access your dashboard</h2>
    <h3>Login: ${username}</h3>
    <h3>Password: ${password}</h3>
    `

    await sendMail(subject, message, send_from, replyTo, send_to)
    res.status(200).json({success: true, message: "Email sent"})
  } catch(error){
    res.status(500).json(error.message)
  }
})

const secret = 'test';
import adminSchema from "./models/admin.js";
import jwt from "jsonwebtoken";

adminSchema.create({
    name: "admin",
    password: "password"
  })

jwt.sign( { username: "admin", id: 1234 }, secret, { expiresIn: "1h" } );


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));
