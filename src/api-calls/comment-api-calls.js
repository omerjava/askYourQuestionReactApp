import { ORIGIN } from "../config/config";
import { getToken } from "../logic/getToken";

export const commentApiCall = {
  create: async (userId, postId, comment) => {
    const accessToken = await getToken();

    if(!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/comments`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify({    
        userId: userId,
        postId: postId,
        text: comment,
      }),
    });

    return response;
  },

  getAll: async (postId) => {
    const response = await fetch(`${ORIGIN}/comments?postId=${postId}`);

    return response;
  },

  update: async (updatedComment, commentId) => {
    const accessToken = await getToken();

    if(!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/comments/${commentId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
      body: JSON.stringify({    
        text: updatedComment
      }),
    });

    return response;
  },
  
  delete: async (commentId) => {
    const accessToken = await getToken();

    if(!accessToken) return "No Token!";

    const response = await fetch(`${ORIGIN}/comments/${commentId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });

    return response;
  },


};
