import axios from "axios";
import authHeader from "./auth-header";

const AUDIT_LOG_URL = `${process.env.REACT_APP_URL}/api/auditlog/`;

const getAuditLogsList = () => {
  return axios.get(AUDIT_LOG_URL + "all", { headers: authHeader() });
};

const getCardAuditLogList = (id) => {
  return axios.get(`${AUDIT_LOG_URL}card/${id}`, { headers: authHeader() });
};

const AuditLogService = {
    getAuditLogsList,
    getCardAuditLogList
};

export default AuditLogService;
