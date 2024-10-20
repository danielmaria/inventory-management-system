import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/v1/auth";

export const login = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
) => {
  return axios.post(`${API_BASE_URL}/change-password`, {
    email,
    currentPassword,
    newPassword,
  });
};
