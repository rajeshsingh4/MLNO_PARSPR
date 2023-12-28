import axios from 'axios';
import authHeader from './auth-header';

const FILE_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/fileList/`;
const BUREAU_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/bureauTAT/`;
const BUREAUDETAIL_URL = `${import.meta.env.VITE_REACT_APP_URL}/api/bureauData/`;

const getFileMasterList = () => axios.get(`${FILE_URL}all`, { headers: authHeader() });

const getFileMasterListByFileId = (fileId) => axios.get(FILE_URL + fileId, { headers: authHeader() });

const getBureauTAT = () => axios.get(`${BUREAU_URL}all`, { headers: authHeader() });

const getBureauReport = (bureauName) => axios.get(BUREAUDETAIL_URL + bureauName, { headers: authHeader() });

const FlieMasterListService = {
	getFileMasterList,
	getFileMasterListByFileId,
	getBureauTAT,
	getBureauReport,
};

export default FlieMasterListService;
