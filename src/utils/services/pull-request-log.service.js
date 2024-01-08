import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { PULL_REQUEST_LOG_URL } from '@/utils/url';

const getPullRequestLogsList = () => AxiosInstance.get(`${PULL_REQUEST_LOG_URL}all`, { headers: authHeader() });

const getPullRequestLogsListByQueryParams = (query) =>
	AxiosInstance.get(`${PULL_REQUEST_LOG_URL}all?${query}`, { headers: authHeader() });

const getPullRequestLogById = (id) => AxiosInstance.get(`${PULL_REQUEST_LOG_URL}card/${id}`, { headers: authHeader() });

const AuditLogService = {
	getPullRequestLogsList,
	getPullRequestLogById,
	getPullRequestLogsListByQueryParams,
};

export default AuditLogService;
