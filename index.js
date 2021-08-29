const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const fs = require("fs");
const Spec = require("./api/models/cullModel");
const config = require("./config");
const dbURI = process.env.dbURI || config.dbURI;

mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveStatic(path.join(__dirname, "/public"), { extensions: ["html"] }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const routes = require("./api/routes/cullRoute"); //importing route
routes(app); //register the route

app.listen(port);
