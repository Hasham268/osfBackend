import {createFeedback, getFeedbacks} from "../controllers/feedback.js"
import express from 'express';

const router = express.Router()


router.post('/', createFeedback);
router.get('/', getFeedbacks);
export default router;