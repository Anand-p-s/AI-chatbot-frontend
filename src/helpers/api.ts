import axios from "axios";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to signup");
  }
  return await res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password }, {withCredentials: true});
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return await res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status", {withCredentials: true});
  if (res.status !== 200) {
    throw new Error("Unable to verify user");
  }
  return await res.data;
};

export const fetchAllChats = async () => {
  const res = await axios.get("/chat/all-chats", {withCredentials: true});
  if (res.status !== 200) {
    throw new Error("Unable to get chats");
  }
  return await res.data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) throw new Error("Unable to generate message");
  return await res.data;
};

export const deleteAllChats = async () => {
  const res = await axios.delete("/chat/delete-chats");
  if (!res) {
    throw new Error("Unable to delete messages");
  }
  return await res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) throw new Error("Unable to logout");
  return await res.data;
};
