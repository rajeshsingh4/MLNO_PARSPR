import axios from "axios";
import authHeader from "./auth-header";

const USER_URL = `${process.env.REACT_APP_URL}/api/test/`;
const MENU_URL = `${process.env.REACT_APP_URL}/api/menu/`;

const getMenu = () => {
  return axios.get(MENU_URL + "all", { headers: authHeader() });
};

const getPublicContent = () => {
  return axios.get(USER_URL + "all");
};

const getUserBoard = () => {
  return axios.get(USER_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(USER_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(USER_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getMenu
};

export default UserService;
