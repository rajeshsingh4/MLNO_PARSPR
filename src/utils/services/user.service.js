import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { MENU_URL, USER_URL } from '@/utils/url';

const getMenu = () => AxiosInstance.get(`${MENU_URL}all`, { headers: authHeader() });

const getPublicContent = () => AxiosInstance.get(`${USER_URL}all`);

const getUserBoard = () => AxiosInstance.get(`${USER_URL}user`, { headers: authHeader() });

const getModeratorBoard = () => AxiosInstance.get(`${USER_URL}mod`, { headers: authHeader() });

const getAdminBoard = () => AxiosInstance.get(`${USER_URL}admin`, { headers: authHeader() });

const UserService = {
	getPublicContent,
	getUserBoard,
	getModeratorBoard,
	getAdminBoard,
	getMenu,
};

export default UserService;
