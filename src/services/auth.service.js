import { loginFetch, registerFetch } from "@/api/auth.api";

let authToken = null;

/**
 * LOGIN
 */
export const login = async (auth) => {
  const data = await loginFetch(auth);

  // se asume { token, user }
  if (data.token) {
    authToken = data.token;
  }

  return data;
};

/**
 * REGISTER
 */
export const register = async (newUser) => {
  const data = await registerFetch(newUser);

  if (data.token) {
    authToken = data.token;
  }

  return data;
};

// /**
//  * LOGOUT
//  */
// export const logoutService = () => {
//   authToken = null;
// };

// /**
//  * GET TOKEN (memoria)
//  */
// export const getToken = () => {
//   return authToken;
// };

// /**
//  * AUTH HEADER
//  */
// export const getAuthHeader = () => {
//   return authToken
//     ? { Authorization: `Bearer ${authToken}` }
//     : {};
// };

// /**
//  * IS AUTHENTICATED
//  */
// export const isAuthenticated = () => {
//   return Boolean(authToken);
// };
