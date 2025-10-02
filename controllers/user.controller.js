import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function login(req, res) {
  if (!req.body.login || !req.body.password) {
    return res.render("login", { error: "Veuillez remplir tous les champs" });
  }

  const user = await userModel.findOne({ login: req.body.login });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.render("login", {
      error: "Utilisateur ou mot de passe incorrect",
    });
  }

  const token = jwt.sign({ login: user.login }, process.env.JWT_SECRET, {
    algorithm: "HS256",
  });
  req.session.token = token;

  res.redirect("/");
}

export function logout(req, res) {
  req.session.destroy(() => res.redirect("/login"));
}
