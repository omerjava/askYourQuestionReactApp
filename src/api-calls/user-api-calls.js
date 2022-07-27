import { ORIGIN } from "../config/config";
import { getToken } from "../logic/getToken";

export const userApiCall = {
  getAllUsers: async () => {
    const accessToken = await getToken();

    if (!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/users`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  getUserById: async (id) => {
    const accessToken = await getToken();

    if (!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/users/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  },

  // need to revise
  update: async (id, username, password) => {
    const accessToken = await getToken();

    if (!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/users/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    });

    return response;
  },

  // need to revise
  delete: async (id) => {
    const accessToken = await getToken();

    const response = await fetch(`${ORIGIN}/users/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });

    return response;
  },
};
