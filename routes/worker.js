import express from "express";
const router = express.Router();

import { signin, signup, getWorker, getApprovedPosts, deleteWorker, updateWorker} from "../controllers/workerLogin.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getWorker);
router.get('/approved', getApprovedPosts);
router.delete('/:id', deleteWorker);
router.patch('/:id', updateWorker);
export default router;