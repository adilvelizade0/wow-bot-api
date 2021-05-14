const express = require("express");
const cors = require("cors");

const db = require("./db/db")();
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const Bot = require("./models/BotData");

app.get("/", (_, res) => {
  res.send("Helo Dev");
});

app.get("/api/top", (_, res) => {
  const promise = Bot.find({});
  promise.then((data) => res.json(data)).catch((err) => res.json(err));
});

// Get id search
app.get("/api/top/:user_id", (req, res, next) => {
  const promise = Bot.findById(req.params.user_id);
  promise
    .then((user) => {
      if (!user) {
        next({ message: "The user was not found.", code: 99 });
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.post("/api/top/add", (req, res) => {
  const bot = new Bot(req.body);
  const promise = bot.save();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

app.put("/api/top/:user_id", (req, res, next) => {
  const promise = Bot.findOneAndUpdate(req.params.user_id, req.body, {
    new: true,
    useFindAndModify: false,
  });
  promise
    .then((user) => {
      if (!user) {
        next({ message: "The user was not found.", code: 99 });
      }
      res.json(user);
    })
    .catch((err) => res.json(err));
});

app.delete("/api/top/:user_id", (req, res, next) => {
  const promise = Bot.findByIdAndRemove(req.params.user_id, {
    useFindAndModify: false,
  });
  promise
    .then((user) => {
      if (!user) {
        next({ message: "The user was not found.", code: 99 });
      }
      res.json({ status: 1 });
    })
    .catch((err) => res.json(err));
});

// Port
require("dotenv").config({ path: "./.env/.env" });
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`),
);
