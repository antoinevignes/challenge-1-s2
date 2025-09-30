export async function AuthMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  res.redirect("/");
}
