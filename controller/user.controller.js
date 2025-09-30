import { header } from "../utils/header.js";
import bcrypt from "bcryptjs";

const user = { username: "Antoine", password: "" };
(async () => {
  user.password = await bcrypt.hash("1234", 10);
})();

function home(_, res) {
  res.send(
    header() +
      `
          <main class="flex flex-col items-center justify-center h-screen gap-4">
            <h1 class="text-2xl font-bold">LOG IN</h1>
            <form
              action="/login"
              method="post"
              class="flex flex-col items-center justify-center gap-4"
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                class="border-1 rounded-md p-1"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                class="border-1 rounded-md p-1"
              />
              <input
                type="submit"
                value="Login"
                class="bg-black border-1 border-black text-white rounded-md px-2 py-1 hover:bg-white hover:text-black transition-all cursor-pointer"
              />
            </form>
          </main>
        </html>
       `
  );
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.send(
      header() +
        `
            <main class="flex flex-col h-screen justify-center items-center gap-4">
              <p class="text-red-600">Veuillez remplir tous les champs</p>
              <a href="/" class="underline hover:font-semibold transition-all">Retour</a>
            </main>
          </html>
        `
    );
  }

  if (
    user.username === username &&
    (await bcrypt.compare(password, user.password))
  ) {
    req.session.user = { username };
    return res.redirect("/dashboard");
  }

  res.send(
    header() +
      `
          <main class="flex flex-col h-screen justify-center items-center gap-4">
            <p class="text-red-600">Identifiants invalides</p>
            <a href="/" class="underline hover:font-semibold transition-all">Réessayer</a>
          </main>
        </html>
      `
  );
}

function dashboard(req, res) {
  res.send(
    header() +
      `
          <main class="flex flex-col justify-center items-center h-screen gap-4">
            <h1 class="font-bold text-2xl">DASHBOARD</h1>
            <p>Hello ${req.session.user.username}</p>
            <a href="/logout" class="underline hover:font-semibold transition-all"
              >Log Out</a
            >
          </main>
        </html>
      `
  );
}

function logout(req, res) {
  req.session.destroy(() => {
    return res.redirect("/");
  });
}

export default { home, login, dashboard, logout };
