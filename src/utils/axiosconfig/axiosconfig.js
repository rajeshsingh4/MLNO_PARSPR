import axios from 'axios';
import authHeader from '@/utils/services/auth-header';

const { VITE_REACT_APP_URL } = import.meta.env;

const AxiosInstance = axios.create({
	baseURL: `${VITE_REACT_APP_URL}/api`,
	headers: authHeader(),
});

AxiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 403) {
			console.log(error.message);
			const navigateTo = window.localStorage.getItem('navigateTo');
			window.localStorage.removeItem('user');
			window.localStorage.removeItem('navigateTo');
			window.location.replace(navigateTo);
		}
	},
);

export default AxiosInstance;
