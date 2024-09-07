const mongoose = require("mongoose")

const connectDB = async () => {
    mongoose.set('strictQuery', false)
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connect on ${connecting.connection.host}, port: ${connecting.connection.port}`)
    } catch (error) {
        console.error(`Error connection to MongoDB`, error)
    }
    
}

module.exports = connectDB