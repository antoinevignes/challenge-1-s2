import bcrypt from "bcryptjs";
import { user } from "../data/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function loginPage(req, res) {
  const error = req.query.error;
  res.render("login", { error });
}

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = "Veuillez remplir tous les champs";
    res.redirect(`/add?error=${encodeURIComponent(error)}`);
    return;
  }

  if (username.trim() === "" || password.trim() === "") {
    const error = "Veuillez remplir tous les champs";
    res.redirect(`/login?error=${encodeURIComponent(error)}`);
    return;
  }

  bcrypt.compare(password, user.password, (_, result) => {
    if (!result || user.username !== username) {
      const error = "Utilisateur ou mot de passe incorrect";
      res.redirect(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    const token = jwt.sign({ user: user.login }, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    req.session.token = token;
    res.redirect("/");
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.redirect("/add");
      return;
    }
    res.redirect("/");
  });
}

export default {
  loginPage,
  login,
  logout,
};
