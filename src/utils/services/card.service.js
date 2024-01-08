import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { CARD_URL } from '@/utils/url';

const getCardTrackingList = () => AxiosInstance.get(`${CARD_URL}all`, { headers: authHeader() });

const updateCardTrackingList = (id, data) => AxiosInstance.put(CARD_URL + id, data, { headers: authHeader() });

const getAllCardsWithFileDeatils = (query) =>
	AxiosInstance.get(`${CARD_URL}all?fileList=true&${query}`, { headers: authHeader() });

const CardTrackingService = {
	getCardTrackingList,
	updateCardTrackingList,
	getAllCardsWithFileDeatils,
};

export default CardTrackingService;
