import axios from 'axios';
import authHeader from './auth-header';
import { AUTH_URL, USER_DETAILS_URL, CHANGE_PASSWORD_URL } from '@/utils/url';

const register = (username, email, password) =>
	axios.post(`${AUTH_URL}signup`, {
		username,
		email,
		password,
	});

const login = (username, password) =>
	axios
		.post(`${AUTH_URL}signin`, {
			username,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem('user', JSON.stringify(response.data));
				const navigateLocation = location.pathname;
				localStorage.setItem('navigateTo', navigateLocation);
			}
			return response.data;
		});

const logout = () => {
	localStorage.removeItem('user');
	const navigateTo = localStorage.getItem('navigateTo') || '/login/bank';
	localStorage.removeItem('navigateTo');
	location.replace(navigateTo);
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const getCurrentUserDetails = () => axios.get(USER_DETAILS_URL, { headers: authHeader() });

const changePassword = (data) => axios.put(CHANGE_PASSWORD_URL, data, { headers: authHeader() });

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
	getCurrentUserDetails,
	changePassword,
};

export default AuthService;
