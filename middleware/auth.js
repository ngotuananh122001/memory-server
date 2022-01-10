// Middleware ban chat la mot function danh chan
// Req truoc khi di vao controller di duoc di qua mddleware de kiem tra

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // autheHeader === undefined || fkfjslfjaflfj
    // -> token = undefined
    // javascript cho truy cap vuot chi so mang
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // 401, not authoriztion
        return res.status(401).json({
            success: false,
            message: 'Access token khong tim thay',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: 'Access token invalid',
        });
    }
};
