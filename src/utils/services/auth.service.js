import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { AUTH_URL, USER_DETAILS_URL, CHANGE_PASSWORD_URL } from '@/utils/url';

const register = (username, email, password) =>
	AxiosInstance.post(`${AUTH_URL}signup`, {
		username,
		email,
		password,
	});

const login = (username, password, type) =>
	AxiosInstance.post(`${AUTH_URL}signin`, {
		username,
		password,
		type,
	})
		.then((response) => {
			if (response.data.accessToken) {
				window.localStorage.setItem('user', JSON.stringify(response.data));
				window.localStorage.setItem('navigateTo', `/login/${type}`);
			}
			return response.data;
		})
		.catch((err) => ({ data: null, error: true, message: 'Invalid creds', errorMessage: err }));

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
