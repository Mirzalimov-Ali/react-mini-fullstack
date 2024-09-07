const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// JWT setting
userSchema.methods.generateJwtToken = function() {
    return jwt.sign(
        { id: this._id, name: this.name },
        process.env.JWT_TOKEN_SECRET,
        { expiresIn: `24h` }
    )
}

// when saved
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// check password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model("User", userSchema)