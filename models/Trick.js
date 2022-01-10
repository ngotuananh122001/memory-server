import mongoose from 'mongoose';

const trickSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const TrickModel = mongoose.model('tricks', trickSchema);

export default TrickModel;
