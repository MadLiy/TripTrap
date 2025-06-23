const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

const register = async (userData) => {
    const { 
        firstname,
        lastname,
        email,
        password
    } = userData;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { user, token };
};

module.exports = {
    register,
    login
};