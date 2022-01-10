import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { verifyToken } from './middleware/auth.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import eventRouter from './routes/event.js';
import jwt from 'jsonwebtoken';
const app = express();
dotenv.config();

// Thêm middleware đảm bảo request hợp lệ
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // disable chính sách CORS trên chrome

// Routes
app.use('/posts', verifyToken, postRouter);
app.use('/auth', authRouter);
app.use('/event', verifyToken, eventRouter);
// const CONNECTION_URL =
//     'mongodb+srv://ngotuananh:doithua2001@cluster0.h652s.mongodb.net/memoryDB?retryWrites=true&w=majority';

const accessToken = jwt.sign(
    { userId: '61daa820e4db8735a8f15361' },
    process.env.ACCESS_TOKEN_SECRET
);

console.log(accessToken);

// local mongodb
const CONNECTION_URL = `mongodb://localhost:27017/${process.env.DB_NAME}`;
const PORT = 5000;
mongoose
    .connect(CONNECTION_URL)
    .then((data) => console.log('Ket noi db thanh cong!'))
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on ${5000}`))
    )
    .catch((err) => console.log('Ket noi DB that bai, error', err));
