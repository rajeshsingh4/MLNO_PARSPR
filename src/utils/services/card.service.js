import axios from 'axios';
import authHeader from './auth-header';
import { CARD_URL } from '@/utils/url';

const getCardTrackingList = () => axios.get(`${CARD_URL}all`, { headers: authHeader() });

const updateCardTrackingList = (id, data) => axios.put(CARD_URL + id, data, { headers: authHeader() });

const getAllCardsWithFileDeatils = (query) =>
	axios.get(`${CARD_URL}all?fileList=true&${query}`, { headers: authHeader() });

const CardTrackingService = {
	getCardTrackingList,
	updateCardTrackingList,
	getAllCardsWithFileDeatils,
};

export default CardTrackingService;
