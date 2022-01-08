import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    url: String,
    status: {
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    },

    // Noi bang collection
    // Moi mot event thuoc ve mot user duy nhat
    // Truong ref: de tham chieu toi collection 'users'
    //
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
});

const EventModel = mongoose.model('events', eventSchema);

export default EventModel;