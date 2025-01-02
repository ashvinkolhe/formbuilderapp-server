const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

const connectDB = async () => {    
    try {    
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Something went wrong while connecting to DB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
