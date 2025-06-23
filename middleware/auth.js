const jwt = require('jsonwebtoken');
const User = require('../model/users');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.redirect('/api/auth/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.redirect('/api/auth/login');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.roles !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin role required.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { auth, isAdmin }; 