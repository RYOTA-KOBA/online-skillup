// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const socketIo = require("socket.io");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors");

const app = express();

app.use(cors());

const server = app.listen(3001, function () {
  console.log("server running on port 3001");
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const io = socketIo(server);

io.on("connection", function (socket) {
  socket.on("SEND_MESSAGE", function (data) {
    io.emit("MESSAGE", data);
  });
});
