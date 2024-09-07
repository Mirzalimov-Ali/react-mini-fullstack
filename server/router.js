const { Router } = require("express");
const { register, login, getMe } = require("./controller/user.controller");
const { protect } = require("./middleware/protect");

const router = Router();

// Auth
router.post('/register', register);
router.post('/login', login);

// Middleware
router.get('/me', protect, getMe);

module.exports = router;