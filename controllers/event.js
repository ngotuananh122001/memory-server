import EventModel from '../models/Event.js';

export const createEvent = async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple check
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Title is required',
        });
    }
    try {
        const newEvent = new EventModel({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        });

        await newEvent.save();

        res.json({
            success: true,
            message: 'Create event successfully',
            event: newEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find({ user: req.userId }).populate(
            'user',
            ['username']
        );

        res.json({
            success: true,
            message: 'Get all events',
            events,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
