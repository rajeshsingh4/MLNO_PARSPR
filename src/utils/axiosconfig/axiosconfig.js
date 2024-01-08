import axios from 'axios';
import authHeader from '@/utils/services/auth-header';

const { VITE_REACT_APP_URL } = import.meta.env;

const AxiosInstance = axios.create({
	baseURL: `${VITE_REACT_APP_URL}/api`,
	headers: authHeader(),
});

export default AxiosInstance;
