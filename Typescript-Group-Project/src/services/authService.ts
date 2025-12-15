import api from "./axios";

export const getUsersService = async () => {
  try {
    const res = await api.get("/users");
    return res.data.users;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message || error?.message || "Failed to get users";
    throw msg;
  }
};

export const registerService = async (username: string, password: string) => {
  const usersJSON = localStorage.getItem("usersAuth") || "[]";
  const users: { username: string; password: string }[] = JSON.parse(usersJSON);

  const exists = users.find((u) => u.username === username);
  if (exists) throw "Username already exists";

  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem("usersAuth", JSON.stringify(users));

  return newUser;
};

export const loginService = async (username: string, password: string) => {
  const usersJSON = localStorage.getItem("usersAuth") || "[]";
  const users: { username: string; password: string }[] = JSON.parse(usersJSON);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) throw "Invalid username or password";

  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};
