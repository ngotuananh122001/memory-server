import express from 'express';
import { register, login, checkAuthenticated } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// @router GET auth/
// @desc check if user logged in
// access Public
router.get('/', verifyToken, checkAuthenticated);

// @router POST auth/register
// @desc Register user
// @access Public -> Bat ky client cx co the call api nay
router.post('/register', register);

router.post('/login', login);
export default router;
