const auth = require('../middleware/auth');
const authService = require('../service/authService');

// Affiche le formulaire d'inscription
const showRegisterForm = (req, res) => {
    try {
        res.render('auth/register');
    } catch (error) {
        console.error("Error rendering register form:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Gère l'inscription d'un utilisateur
const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        console.log({
            message: 'User created successfully',
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
        res.redirect('login');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Affiche le formulaire de connexion
const showLoginForm = (req, res) => {
    try {
        res.render('auth/login');
    } catch (error) {
        console.error("Error rendering login form:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Gère la connexion d'un utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: user.roles
            }
        });
        return res.redirect('/api/dashboard');
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Gère la déconnexion de l'utilisateur
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.redirect('/api/auth/login');
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    register,
    login,
    showRegisterForm,
    showLoginForm,
    logout
};