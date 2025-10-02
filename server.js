import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import router from "./routes/index.js";
import path from "path";

dotenv.config();

const app = express();
const { PORT, MONGO_URL } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));

app.use(
  session({
    name: "session",
    secret: "secret-session",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.set("view engine", "pug");
app.set("views", path.join(path.resolve(), "views"));

try {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("MongoDB connection error:", err);
}

app.use(router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
