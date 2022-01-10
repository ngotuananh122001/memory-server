import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, // using base64 to convert image to string
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

const PostModel = mongoose.model('posts', postSchema);

export default PostModel;
