import axios from 'axios';
import authHeader from './auth-header';
import { PULL_REQUEST_URL } from '@/utils/url';

const getPullRequest = (query) =>
	axios.get(`${PULL_REQUEST_URL}all${query ? `?${query}` : ''}`, { headers: authHeader() });

const getPullRequestById = (pullReqId) => axios.get(PULL_REQUEST_URL + pullReqId, { headers: authHeader() });

const createPullRequest = (data) => axios.post(PULL_REQUEST_URL, data, { headers: authHeader() });

const updatePullRequest = (id, data) => axios.put(PULL_REQUEST_URL + id, data, { headers: authHeader() });

const FlieMasterListService = {
	getPullRequest,
	getPullRequestById,
	createPullRequest,
	updatePullRequest,
};

export default FlieMasterListService;
