import axios from 'axios';
import authHeader from './auth-header';
import { FILE_URL, BUREAUDETAIL_URL, BUREAU_URL } from '@/utils/url';

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
