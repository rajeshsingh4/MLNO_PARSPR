import axios from "axios";
import authHeader from './auth-header';

const PULL_REQUEST_URL = `${process.env.REACT_APP_URL}/api/pull-request/`;

const getPullRequest = (query) => {
  return axios.get(PULL_REQUEST_URL + `all${query ? `?${query}` : ''}`, { headers: authHeader() });
};

const getPullRequestById = (pullReqId) => {
    return axios.get(PULL_REQUEST_URL + pullReqId, { headers: authHeader() });
};

const createPullRequest = (data) => {
    return axios.post(PULL_REQUEST_URL, data, { headers: authHeader() });
};

const updatePullRequest = (id, data) => {
    return axios.put(PULL_REQUEST_URL + id, data, { headers: authHeader() });
};

const FlieMasterListService = {
    getPullRequest,
    getPullRequestById,
    createPullRequest,
    updatePullRequest
};

export default FlieMasterListService;
