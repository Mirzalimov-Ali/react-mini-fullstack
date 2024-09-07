const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const protect = async (req, res, next) => {
    let token;

    // Tokenni headerdan olish
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Tokenni olish
            token = req.headers.authorization.split(' ')[1];
            // Tokenni dekod qilish
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Foydalanuvchi ma'lumotlarini olish
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
