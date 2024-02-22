import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { FILE_URL, BUREAUDETAIL_URL, BUREAU_URL } from '@/utils/url';

const uploadMasterFiles = (formData, onUploadProgress) =>
	AxiosInstance.post(`${FILE_URL}upload`, formData, {
		headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
		onUploadProgress,
	});

const getFileMasterList = () => AxiosInstance.get(`${FILE_URL}all`, { headers: authHeader() });

const getFileMasterListForBank = () => AxiosInstance.get(`${FILE_URL}all/bank`, { headers: authHeader() });

const getFileMasterListForBureau = () => AxiosInstance.get(`${FILE_URL}all/bureau`, { headers: authHeader() });

const getFileMasterListByFileId = (fileId) => AxiosInstance.get(FILE_URL + fileId, { headers: authHeader() });

const getBureauTAT = () => AxiosInstance.get(`${BUREAU_URL}all`, { headers: authHeader() });

const getBureauReport = (bureauName) => AxiosInstance.get(BUREAUDETAIL_URL + bureauName, { headers: authHeader() });

const FlieMasterListService = {
	getFileMasterList,
	getFileMasterListByFileId,
	getBureauTAT,
	getBureauReport,
	getFileMasterListForBank,
	getFileMasterListForBureau,
	uploadMasterFiles,
};

export default FlieMasterListService;
