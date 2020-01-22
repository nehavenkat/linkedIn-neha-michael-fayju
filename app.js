const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongooseConnection = require("./src/db/mongoose");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
const port = process.env.PORT;
mongooseConnection();
const experienceRouter = require("./src/route/experience");
const profileRouter = require("./src/route/profile");
const postRouter = require("./src/route/post");

//app.use(bodyParser.json());

app.use(express.json());

app.use(express.static('public'));

app.get("/", (req, res) => res.send("LinledIn Profile"));

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/experiences", experienceRouter);
app.use("/profiles", profileRouter);
app.use("/posts", postRouter);

console.log(listEndpoints(app));
app.listen(port, () => console.log(`Your app is listening on port ${port}!`));
