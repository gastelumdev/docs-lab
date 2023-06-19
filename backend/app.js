const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const participantRoutes = require("./routes/participant");
const messageRoutes = require("./routes/message")
const siteRoutes = require("./features/sites/routes");
const pageRoutes = require("./features/pages/routes");
const sectionRoutes = require("./features/sections/routes");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });
const connectDB = require('./config/db');
const eventModel = require("./models/Event");

connectDB();

// middleware
console.log(process.env.CORS_URL)
const corsOptions = {
    origin: process.env.CORS_URL || "http://localhost:3000"
}

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(userRoutes);
app.use(eventRoutes);
app.use(participantRoutes);
app.use(messageRoutes);
app.use(siteRoutes);
app.use(pageRoutes);
app.use(sectionRoutes);

app.listen(process.env.PORT || 4000);