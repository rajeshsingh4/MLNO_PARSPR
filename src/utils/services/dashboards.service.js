import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { DASHBOARD_URL } from '@/utils/url';

const getBankDashboardDetails = () => AxiosInstance.get(`${DASHBOARD_URL}bank`, { headers: authHeader() });
const getBureauDashboardDetails = () => AxiosInstance.get(`${DASHBOARD_URL}bureau`, { headers: authHeader() });
const getCourierDashboardDetails = () => AxiosInstance.get(`${DASHBOARD_URL}courier`, { headers: authHeader() });

const CardTrackingService = {
	getBankDashboardDetails,
	getBureauDashboardDetails,
	getCourierDashboardDetails,
};

export default CardTrackingService;
