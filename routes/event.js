import express from 'express';
import { createEvent, getEvents } from '../controllers/event.js';
const router = express.Router();

// @router POST auth/register
// @desc create event
// @access Private: yeu cau logged in
router.post('/', createEvent);

// @router POST auth/register
// @desc create event
// @access Private: yeu cau logged in
router.get('/', getEvents);

export default router;
