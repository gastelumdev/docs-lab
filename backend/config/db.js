const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        // const conn = await mongoose.connect("mongodb+srv://gastelumdev:2JHUX4jhJ02Pk5oP@collabtime-mern.tpmchkg.mongodb.net/?retryWrites=true&w=majority");
        
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;