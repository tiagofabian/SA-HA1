import { loginUser, registerUser, updateUser, disableUser } from "@/api/auth.api";

let authToken = null;

/**
 * LOGIN
 */
export const login = async (auth) => {
  const data = await loginUser(auth);

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
  const data = await registerUser(newUser);

  if (data.token) {
    authToken = data.token;
  }

  return data;
};

/**
 * UPDATE USER
 */
export const update = async (userId, updatedUser) => {
  const data = await updateUser(userId, updatedUser);
  return data;
};

/**
 * DELETE USER
 */
export const disable = async (userId) => {
  const data = await disableUser(userId);
  return data;
};
