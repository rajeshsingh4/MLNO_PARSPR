import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { CARD_URL } from '@/utils/url';

const getCardTrackingList = (fileId) => AxiosInstance.get(`${CARD_URL}all?fileId=${fileId}`, { headers: authHeader() });

const updateCardTrackingList = (id, data) => AxiosInstance.put(CARD_URL + id, data, { headers: authHeader() });

const getAllCardsWithFileDeatils = () => AxiosInstance.get(`${CARD_URL}all`, { headers: authHeader() });

const CardTrackingService = {
	getCardTrackingList,
	updateCardTrackingList,
	getAllCardsWithFileDeatils,
};

export default CardTrackingService;
