import posts from "../data/posts.js";

function getPost(req, res) {
  const token = req.session.token;

  res.render("posts", {
    posts,
    token,
  });
}

function postForm(req, res) {
  const error = req.query.error;

  res.render("form", { error });
}

function addPost(req, res) {
  const { name, date } = req.body;

  if (!name || !date) {
    const error = "Veuillez remplir tous les champs";
    res.redirect(`/add?error=${encodeURIComponent(error)}`);
    return;
  }

  if (name.trim() === "" || date.trim() === "") {
    const error = "Veuillez remplir tous les champs";
    res.redirect(`/add?error=${encodeURIComponent(error)}`);
    return;
  }

  posts.push({ title: name, date });
  res.redirect("/");
}

export default {
  getPost,
  postForm,
  addPost,
};
