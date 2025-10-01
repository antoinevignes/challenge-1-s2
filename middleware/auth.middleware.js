import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export default function (req, res, next) {
  if (req.session.token) {
    const decoded = jwt.decode(req.session.token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Blocked by authMiddleware");
      const error = "Erreur à l'authentification";
      res.redirect(`/login?error=${encodeURIComponent(error)}`);
      return;
    }
    next();
    return;
  }

  console.log("Blocked by authMiddleware");
  const error = "Vous devez vous connecter pour continuer";
  res.redirect(`/login?error=${encodeURIComponent(error)}`);
}
