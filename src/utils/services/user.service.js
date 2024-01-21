import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import { MENU_URL, USER_URL, USER_DETAILS_URL } from '@/utils/url';

const getMenu = () => AxiosInstance.get(`${MENU_URL}all`);

const getAllUsers = () => AxiosInstance.get(`${USER_URL}all`);

const createNewUser = (data) => AxiosInstance.post(USER_DETAILS_URL, data);

const updateUserDetails = (id, data) => AxiosInstance.put(`${USER_DETAILS_URL}/${id}`, data);

// const getPublicContent = () => AxiosInstance.get(`${USER_URL}all`);

// const getUserBoard = () => AxiosInstance.get(`${USER_URL}user`, { headers: authHeader() });

// const getModeratorBoard = () => AxiosInstance.get(`${USER_URL}mod`, { headers: authHeader() });

// const getAdminBoard = () => AxiosInstance.get(`${USER_URL}admin`, { headers: authHeader() });

const UserService = {
	// getPublicContent,
	// getUserBoard,
	// getModeratorBoard,
	// getAdminBoard,
	getMenu,
	getAllUsers,
	createNewUser,
	updateUserDetails,
};

export default UserService;
