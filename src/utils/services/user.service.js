import axios from 'axios';
import authHeader from './auth-header';
import { MENU_URL, USER_URL } from '@/utils/url';

const getMenu = () => axios.get(`${MENU_URL}all`, { headers: authHeader() });

const getPublicContent = () => axios.get(`${USER_URL}all`);

const getUserBoard = () => axios.get(`${USER_URL}user`, { headers: authHeader() });

const getModeratorBoard = () => axios.get(`${USER_URL}mod`, { headers: authHeader() });

const getAdminBoard = () => axios.get(`${USER_URL}admin`, { headers: authHeader() });

const UserService = {
	getPublicContent,
	getUserBoard,
	getModeratorBoard,
	getAdminBoard,
	getMenu,
};

export default UserService;
