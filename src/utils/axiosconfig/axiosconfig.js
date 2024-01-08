import axios from 'axios';
import authHeader from '@/utils/services/auth-header';
import AuthService from '@/utils/services/auth.service';

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
			AuthService.logout();
		}
	},
);

export default AxiosInstance;
