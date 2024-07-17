const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const app = express();
const port = 9050;

const routes = require("./Route/Route");

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use("/", routes);

mongoose
    .connect("mongodb+srv://dzende725:dinesh1706@cluster0.ze8ajor.mongodb.net/salon", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(port, () => {
            console.log("Server is running on port", port);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
