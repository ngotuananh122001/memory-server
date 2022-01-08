import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createAt: {
        type: Date,
        default: new Date(),
    },
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
