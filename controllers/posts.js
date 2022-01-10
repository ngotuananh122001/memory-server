import mongoose from 'mongoose';

// Handle request with url ...../posts...
import PostModel from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostModel.find({ user: req.userId });
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostModel({
        ...post,
        user: req.userId,
    });
    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    // PHuong thuc put requst nhan url voi params id
    // Dat trong truong params cua req object
    // -> params: la mot obj co field la id
    // su dung destructuring ket hop voi doi ten
    // Nhan duoc bien _id co gia tri bang tham so user gui len

    const { id: _id } = req.params;
    const post = req.body;

    // Kiem tra _id co thuc su hop le trong mongoDB
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Id of post is not valid');
    }

    const updatePost = await PostModel.findByIdAndUpdate(
        _id,
        {
            ...post,
            user: req.userId,
        },
        {
            new: true,
        }
    );

    res.json(updatePost);
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            success: false,
            message: 'Id of post is not valid',
        });
    }

    try {
        const post = await PostModel.findOne({ _id });
        if (!post) {
            return res.status(400).json({
                success: false,
                message: 'Not exist post with this id',
            });
        }

        await PostModel.deleteOne({ _id });

        return res.json({
            success: true,
            message: 'Delete post successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
