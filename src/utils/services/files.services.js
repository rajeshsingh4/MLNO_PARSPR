import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { FILE_URL, BUREAUDETAIL_URL, BUREAU_URL } from '@/utils/url';

const getFileMasterList = () => AxiosInstance.get(`${FILE_URL}all`, { headers: authHeader() });

const getFileMasterListByFileId = (fileId) => AxiosInstance.get(FILE_URL + fileId, { headers: authHeader() });

const getBureauTAT = () => AxiosInstance.get(`${BUREAU_URL}all`, { headers: authHeader() });

const getBureauReport = (bureauName) => AxiosInstance.get(BUREAUDETAIL_URL + bureauName, { headers: authHeader() });

const FlieMasterListService = {
	getFileMasterList,
	getFileMasterListByFileId,
	getBureauTAT,
	getBureauReport,
};

export default FlieMasterListService;
