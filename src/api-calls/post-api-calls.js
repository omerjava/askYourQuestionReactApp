import { ORIGIN } from "../config/config";
import { getToken } from "../logic/getToken";

export const postApiCall = {
  create: async (text, title, userId) => {
    const accessToken = await getToken();

    if (!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/posts`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({
        text: text,
        title: title,
        userId: userId,
      }),
    });

    return response;
  },

  getAll: async () => {
    const response = await fetch(`${ORIGIN}/posts`);

    return response;
  },

  update: async (title, text, postId) => {
    const accessToken = await getToken();

    if (!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/posts/${postId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
      body: JSON.stringify({
        text: text,
        title: title,
      }),
    });

    return response;
  },

  delete: async (postId) => {
    const accessToken = await getToken();

    if (!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/posts/${postId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });

    return response;
  },
};
