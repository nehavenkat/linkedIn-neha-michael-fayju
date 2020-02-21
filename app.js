const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongooseConnection = require("./src/db/mongoose");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
const port = process.env.PORT;
mongooseConnection();
const socketio = require("socket.io"); //socket io installed
const http = require("http"); //http should be defined
const experienceRouter = require("./src/route/experience");
const profileRouter = require("./src/route/profile");
const postRouter = require("./src/route/post");

app.use(bodyParser.json());

var whitelist = ["http://localhost:3000", "https://faizanbardai.github.io"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

// app.use(express.json());

app.get("/", (req, res) => res.send("LinkedIn Profile using VSC Azure"));

//server.use("/images", express.static(path.join(__dirname, "images")))
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/experiences", experienceRouter);
app.use("/profiles", profileRouter);
app.use("/posts", postRouter);

const socketServer = http
  .createServer(app)
  .listen(process.env.CHATPORT || 7002);
const io = socketio(socketServer);
io.set("transports", ["websocket"]);
io.on("connection", async socket => {
  //console.log(socket.id)

  socket.on("broadcast", message => {
    console.log(message);
    socket.broadcast.emit("broadcast", message);
    socket.emit("broadcast", message);
  });
});

console.log(listEndpoints(app));
app.listen(port, () => console.log(`Your app is listening on port ${port}!`));
