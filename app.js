const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const mongooseConnection = require("./src/db/mongoose");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
const port = process.env.PORT;
mongooseConnection();
const experienceRouter = require("./src/route/experience");
const profileRouter = require("./src/route/profile");
const postRouter = require("./src/route/post");
const auth = require('./auth')




//app.use(bodyParser.json());

app.use(express.json());

app.use(express.static('public'));

app.get("/", (req, res) => res.send("LinledIn Profile"));

app.use(auth)

app.use("/experiences", experienceRouter);
app.use("/profiles", profileRouter);
app.use("/posts", postRouter);

console.log(listEndpoints(app));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
