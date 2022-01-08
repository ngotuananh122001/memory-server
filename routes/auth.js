import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

// @router POST auth/register
// @desc Register user
// @access Public -> Bat ky client cx co the call api nay
router.post('/register', register);

router.post('/login', login);
export default router;
