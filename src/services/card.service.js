import axios from "axios";
import authHeader from "./auth-header";

const CARD_URL = `${process.env.REACT_APP_URL}/api/cardtrack/`;

const getCardTrackingList = () => {
  return axios.get(CARD_URL + "all", { headers: authHeader() });
};

const updateCardTrackingList = (id, data) => {
  return axios.put(CARD_URL + id, data, { headers: authHeader() });
};

const getAllCardsWithFileDeatils = (query) => {
  return axios.get(CARD_URL + `all?fileList=true&${query}`, { headers: authHeader() });
};

const CardTrackingService = {
  getCardTrackingList,
  updateCardTrackingList,
  getAllCardsWithFileDeatils
};

export default CardTrackingService;
