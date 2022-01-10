import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createAt: {
        type: Date,
        default: new Date(),
    },
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
