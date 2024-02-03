import AxiosInstance from '@/utils/axiosconfig/axiosconfig';
import authHeader from './auth-header';
import { PULL_REQUEST_URL } from '@/utils/url';

const getPullRequest = (query) =>
	AxiosInstance.get(`${PULL_REQUEST_URL}all${query ? `?${query}` : ''}`, { headers: authHeader() });

const getPullRequestById = (pullReqId) => AxiosInstance.get(PULL_REQUEST_URL + pullReqId, { headers: authHeader() });

const createPullRequest = (data) => AxiosInstance.post(PULL_REQUEST_URL, data, { headers: authHeader() });

const updatePullRequest = (id, data) => AxiosInstance.put(PULL_REQUEST_URL + id, data, { headers: authHeader() });

const getBankDashboardDetails = () => AxiosInstance.get(`${PULL_REQUEST_URL}dashboard/bank`, { headers: authHeader() });

const getBureauDashboardDetails = () =>
	AxiosInstance.get(`${PULL_REQUEST_URL}dashboard/bureau`, { headers: authHeader() });

const PullRequestService = {
	getPullRequest,
	getPullRequestById,
	createPullRequest,
	updatePullRequest,
	getBankDashboardDetails,
	getBureauDashboardDetails,
};

export default PullRequestService;
