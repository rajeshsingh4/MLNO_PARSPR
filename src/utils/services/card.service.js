import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { CARD_URL } from '@/utils/url';

const getCardTrackingList = (fileId) =>
	AxiosInstance.get(`${CARD_URL}bank/all?fileId=${fileId}`, { headers: authHeader() });

const updateCardTrackingList = (id, data) => AxiosInstance.put(CARD_URL + id, data, { headers: authHeader() });

const getAllCardsWithFileDetailsForBank = () => AxiosInstance.get(`${CARD_URL}bank/all`, { headers: authHeader() });

const getAllCardsWithFileDetailsForBureau = () => AxiosInstance.get(`${CARD_URL}bureau/all`, { headers: authHeader() });

const postBureauCardsToCourier = (id, data) =>
	AxiosInstance.post(`${CARD_URL}${id}/courier/start`, data, { headers: authHeader() });

const CardTrackingService = {
	getCardTrackingList,
	updateCardTrackingList,
	getAllCardsWithFileDetailsForBank,
	getAllCardsWithFileDetailsForBureau,
	postBureauCardsToCourier,
};

export default CardTrackingService;
