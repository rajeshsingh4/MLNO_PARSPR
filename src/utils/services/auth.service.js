import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { AUTH_URL, USER_DETAILS_URL, CHANGE_PASSWORD_URL } from '@/utils/url';

const register = (username, email, password) =>
	AxiosInstance.post(`${AUTH_URL}signup`, {
		username,
		email,
		password,
	});

const login = (username, password) =>
	AxiosInstance.post(`${AUTH_URL}signin`, {
		username,
		password,
	}).then((response) => {
		if (response.data.accessToken) {
			window.localStorage.setItem('user', JSON.stringify(response.data));
			const navigateLocation = window.location.pathname;
			window.localStorage.setItem('navigateTo', navigateLocation);
		}
		return response.data;
	});

const logout = () => {
	window.localStorage.removeItem('user');
	const navigateTo = window.localStorage.getItem('navigateTo') || '/login/landing';
	window.localStorage.removeItem('navigateTo');
	window.location.replace(navigateTo);
};

const getCurrentUser = () => JSON.parse(window.localStorage.getItem('user'));

const getCurrentUserDetails = () => AxiosInstance.get(USER_DETAILS_URL, { headers: authHeader() });

const changePassword = (data) => AxiosInstance.put(CHANGE_PASSWORD_URL, data, { headers: authHeader() });

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
	getCurrentUserDetails,
	changePassword,
};

export default AuthService;
