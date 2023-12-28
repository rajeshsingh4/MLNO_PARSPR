import axios from "axios";
import authHeader from "./auth-header";

const FILE_URL = `${process.env.REACT_APP_URL}/api/fileList/`;
const BUREAU_URL = `${process.env.REACT_APP_URL}/api/bureauTAT/`;
const BUREAUDETAIL_URL = `${process.env.REACT_APP_URL}/api/bureauData/`;

const getFileMasterList = () => {
  return axios.get(FILE_URL + "all", { headers: authHeader() });
};

const getFileMasterListByFileId = (fileId) => {
    return axios.get(FILE_URL + fileId, { headers: authHeader() });
  };

const getBureauTAT = () => {
  return axios.get(BUREAU_URL + "all", { headers: authHeader() });
}

const getBureauReport = (bureauName) => {
  return axios.get(BUREAUDETAIL_URL + bureauName, { headers: authHeader() });
}

const FlieMasterListService = {
    getFileMasterList,
    getFileMasterListByFileId,
    getBureauTAT,
    getBureauReport
};

export default FlieMasterListService;
