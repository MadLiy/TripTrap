const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

// Inscrit un nouvel utilisateur après vérification de l'unicité de l'email
const register = async (userData) => {
    const { 
        firstname,
        lastname,
        email,
        password
    } = userData;
    
    // Vérifie si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée l'utilisateur
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    return user;
};

// Authentifie un utilisateur et retourne le token JWT
const login = async (email, password) => {
    // Recherche l'utilisateur par email
    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Génère un token JWT
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