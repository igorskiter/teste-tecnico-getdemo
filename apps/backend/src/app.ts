import demos from "./controllers/demos";
import frames from "./controllers/frames";

const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.get("/demos", demos);

app.get("/frames/:id", frames);
app.put("/frames/:id", frames);

module.exports = app;
