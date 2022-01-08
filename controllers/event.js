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

    const newEvent = new EventModel({
        title,
        description,
        url: url.startsWith('https://') ? url : `https://${url}`,
        status: status || 'TO LEARN',
        user: '61d7c76cabaa4fcfb0e01c56',
    });

    await newEvent.save()

    res.json({
        success: true,
        message: 'Create event successfully',
        event: newEvent,
    });
};
