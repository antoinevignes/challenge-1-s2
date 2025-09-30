import express from "express";
import router from "./routes/index.js";
import session from "express-session";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  session({
    name: "user",
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
