import { expireInMinutes, ORIGIN } from "../config/config";

export const getToken = async () => {
  if (tokenExpired()) {
    const userId = localStorage.getItem("userId");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!userId || !refreshToken) {
      console.log("tokens.js 9 | no refresh token or user id!");
      return null;
    }

    const data = await getValidTokenFromServer(userId, refreshToken);

    if (data === "Your access is expired!") {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
      return null;
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("expirationDate", newExpirationDate());
    return localStorage.getItem("accessToken");
  } else if (!localStorage.getItem("accessToken")) {
    console.log("tokens.js 27 | no access token");
    return null;
  } else {
    console.log("tokens.js 30 | token not expired");
    return localStorage.getItem("accessToken");
  }
};

export const newExpirationDate = () => {
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + expireInMinutes);
  return expiration;
};

const tokenExpired = () => {
  const now = Date.now();

  const expirationDate = localStorage.getItem("expirationDate");
  const expireDate = new Date(expirationDate);

  if (now > expireDate.getTime()) {
    return true; // token expired
  }

  return false; // valid token
};

const getValidTokenFromServer = async (userId, refreshToken) => {
  // get new token from server with refresh token
  try {
    const response = await fetch(`${ORIGIN}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        refreshToken: refreshToken,
      }),
    });
    if (response.ok) {
      const token = await response.json();
      return token;
    } else {
      return "Your access is expired!";
    }
  } catch (error) {
    throw new Error("Issue getting new token", error.message);
  }
};
