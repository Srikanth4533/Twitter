const mongoose = require("mongoose")

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/twitter_dev')
        console.log(`MongoDB connected successfully.....`)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`)
    }
}

module.exports = {
    connect
}
