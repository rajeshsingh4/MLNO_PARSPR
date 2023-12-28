import axios from 'axios';
import authHeader from './auth-header';

const AUTH_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/auth/`;
const USER_DETAILS_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/userdetails`;
const CHANGE_PASSWORD_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/changepassword`;

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
			}
			return response.data;
		});

const logout = () => {
	localStorage.removeItem('user');
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
