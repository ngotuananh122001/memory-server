import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import TrickModel from '../models/Trick.js';

export const register = async (req, res) => {
    const { username, password, email } = req.body;

    // Yeu cau phia client phai validate username va password rat can than
    // Simple Validate

    if (!username || !password || !email) {
        return res.status(400).json({
            success: false,
            message: 'Email, username or password bi bo trong',
        });
    }

    try {
        // check for existing user
        let user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken',
            });
        }

        // check for duplicate email
        user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email already taken',
            });
        }
        // All good
        // Tien hanh tao tai khoan

        // Encode password using library argon2
        const hasedPassword = await argon2.hash(password);

        // Create user by model mongoose
        // sync
        const newUser = new UserModel({
            email,
            username,
            password: hasedPassword,
        });

        // Save to database -> async
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        // Trick for user
        await TrickModel.create({
            username,
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: 'Create user successfully',
            accessToken,
            user: {
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                createAt: newUser.createAt,
            },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    // Simple check
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Username or password bi bo trong',
        });
    }

    try {
        // check for existing user
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Username incorrect',
            });
        }

        // Check mk
        // Parse password to hashcode, compare with passwordHased that stored in DB
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Password incorrect',
            });
        }

        // Neu password valid, return token to client
        const accessToken = jwt.sign(
            {
                userId: user._id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'Logged in successfully',
            accessToken,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                createAt: user.createAt,
            },
        });

        // All good
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export const checkAuthenticated = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select('-password');

        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Token invalid',
            });
        }
        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
