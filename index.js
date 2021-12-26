import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./routes/posts.js";
const app = express();

// Thêm middleware đảm bảo request hợp lệ
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // disable chính sách CORS trên chrome

// By using it, all path which start with /posts will use postRouter
app.use("/posts", postRouter);

const CONNECTION_URL =
    "mongodb+srv://ngotuananh:doithua2001@cluster0.h652s.mongodb.net/memoryDB?retryWrites=true&w=majority";
const PORT = 5000;
mongoose
    .connect(CONNECTION_URL)
    .then((data) => console.log("Ket noi db thanh cong, data: " + data))
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on ${5000}`))
    )
    .catch((err) => console.log("Ket noi DB that bai, error", err));
