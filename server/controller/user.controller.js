const User = require("../model/user.model");
const uuid = require("uuid");

const register = async (req, res) => {
    try {
        const { name, password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, msg: "Passwords do not match!" })
        }

        const apiKey = uuid.v4()

        const userExist = await User.findOne({ name })

        if (userExist) {
            return res.status(409).json({ success: false, msg: "This name already exists!" })
        }

        const user = await User.create({
            name,
            password,
            apiKey,
        })

        console.log("User: ", user)

        res.status(201).json({
            success: true,
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const login = async (req, res) => {
    try {
        const { name, password } = req.body

        const user = await User.findOne({ name })

        if(!user) {
            return next(new ErrorResponse("Invalid Credentials!", 404))
        }
        
        const isMatch = await user.matchPassword(password)

        if(!isMatch) {
            return next(new ErrorResponse("Invalid Credentials!", 404))
        }
        
        const token = user.generateJwtToken()

        res.status(201).json({
            success: true,
            user,
            token: token
        })

        console.log("User is authentificated!", user, "Token: " + token)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found!" });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { register, login, getMe }
