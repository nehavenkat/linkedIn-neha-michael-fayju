const express = require("express");
const app = express();
const listEndpoints = require('express-list-endpoints')
require('dotenv').config()
const port = process.env.PORT;
const experienceRouter = require('./src/route/experience')
const profileRouter = require('./src/route/profile')
const postRouter = require('./src/route/post')

app.get("/", (req, res) => res.send("LinledIn Profile"));

app.use('/experiences', experienceRouter)
app.use('/profiles', profileRouter)
app.use('/posts', postRouter)

console.log(listEndpoints(app));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
