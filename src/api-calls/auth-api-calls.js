import { ORIGIN } from "../config/config";

export const authApiCall = {
  register: async (username, password) => {
    const response = await fetch(`${ORIGIN}/auth/register`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    });

    return response;
  },

  login: async (username, password) => {
    const response = await fetch(`${ORIGIN}/auth/login`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    });

    return response;
  },

  logout: async () => {
    let userId = localStorage.getItem("userId");

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");

    if (!userId) return;

    const response = await fetch(`${ORIGIN}/auth/logout/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) console.log("Refresh token is Deleted!");
  },
};
