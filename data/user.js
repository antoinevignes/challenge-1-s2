import bcrypt from "bcryptjs";

export const user = {
  username: "Alan",
  password: "",
};

bcrypt.hash("4l4l", 10, (_, hash) => {
  user.password = hash;
});
