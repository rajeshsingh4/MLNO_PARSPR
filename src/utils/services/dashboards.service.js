import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { DASHBOARD_URL } from '@/utils/url';

const getBankDashboardDetails = (query) => AxiosInstance.get(`${DASHBOARD_URL}bank${query}`, { headers: authHeader() });
const getBureauDashboardDetails = (query) =>
	AxiosInstance.get(`${DASHBOARD_URL}bureau${query}`, { headers: authHeader() });
const getCourierDashboardDetails = () => AxiosInstance.get(`${DASHBOARD_URL}courier`, { headers: authHeader() });

const CardTrackingService = {
	getBankDashboardDetails,
	getBureauDashboardDetails,
	getCourierDashboardDetails,
};

export default CardTrackingService;
