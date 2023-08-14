const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const config = require('../config/config');

exports.register = async (req, res, next) => {
    const {
        firstname,
        middlename,
        lastname,
        gr_no,
        password,
        email,
        role,
        institute,
        programme,
        sessionExpiry } = req.body;

    try {
        const existingUser = await User.findOne({ gr_no });

        if (existingUser) {
            const error = new Error("User already exists")
            error.statusCode = 409;
            throw error;

        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const userRole = await Role.findOne({ _id: role });

        if (!userRole) {
            const error = new Error("Invalid role")
            error.statusCode = 400;
            throw error;
        }

        const newUser = new User({
            firstname,
            middlename,
            lastname,
            gr_no,
            password: hashedPassword,
            email,
            role: userRole._id,
            institute,
            programme,
            sessionExpiry,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', userinfo: newUser });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {

    const { gr_no, password } = req.body;

    try {

        const user = await User.findOne({ gr_no });

        //User exist or not
        if (!user) {
            const error = new Error('User Not Found');
            error.statusCode = 401;
            throw error;
        }

        // User is active or not
        if (user.status === 0) {
            const error = new Error('User is inactive');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error('Password is incorrect');
            error.statusCode = 401;
            throw error;
        }


        const expirationTime = Math.floor(Date.now() / 1000) + 45 * 60;



        const token = jwt.sign({

            userId: user._id,
            exp: expirationTime
        },
            config.secretKey, {
        });

        res.json({
            token, user: {
                gr_no: user.gr_no,
                role: user.role.role,
                message:"Welcome"
            }
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}


