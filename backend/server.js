const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./Routes/AuthRoutes");
const questionnaireRoutes = require("./Routes/QuestionnaireRoutes");
const todoRoutes = require("./Routes/TodoRoutes");

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Include your routes
app.use(authRoutes);
app.use(questionnaireRoutes);
app.use(todoRoutes);

const dbURI = process.env.MONGO_URL;
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(4000, () => {
            console.log("connected");
        });
    })
    .catch((err) => console.log(err));
