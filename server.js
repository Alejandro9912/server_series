const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_Version } = require("./constants");

const app = express();

// Import routines

const authRoutes = require('./router/auth')

// Configure Body Parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder

app.use(express.static("uploads"));

// Configure Header HTTP -CORS

app.use(cors());

// Configure routings

app.use(`/api/${API_Version}`, authRoutes)

module.exports = app;