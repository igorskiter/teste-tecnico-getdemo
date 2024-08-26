import demos from "./controllers/demos";
import frames from "./controllers/frames";

const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");

const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.get("/demos", demos);

app.put("/frames/:id", frames);

module.exports = app;
