const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let matchData = {
  homeScore: 0,
  awayScore: 0,
  time: "00:00",
  half: 1,
  goalScorer: "",
};

io.on("connection", (socket) => {
  console.log("Nowe połączenie:", socket.id);

  socket.emit("update", matchData);

  socket.on("updateScore", (data) => {
    matchData.homeScore = data.homeScore;
    matchData.awayScore = data.awayScore;
    io.emit("update", matchData);
  });

  socket.on("updateTime", (data) => {
    matchData.time = data.time;
    io.emit("update", matchData);
  });

  socket.on("updateHalf", (data) => {
    matchData.half = data.half;
    io.emit("update", matchData);
  });

  socket.on("updateGoalScorer", (data) => {
    matchData.goalScorer = data.goalScorer;
    io.emit("update", matchData);
  });
});

server.listen(3000, () => {
  console.log("Serwer działa na porcie 3000");
});
