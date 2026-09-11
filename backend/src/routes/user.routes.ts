import express from 'express';
import { updateMe } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.put('/me', protect, updateMe);

export default router;
