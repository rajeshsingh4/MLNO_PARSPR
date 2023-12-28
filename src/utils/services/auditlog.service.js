import axios from 'axios';
import authHeader from './auth-header';
import { AUDIT_LOG_URL } from '@/utils/url';

const getAuditLogsList = () => axios.get(`${AUDIT_LOG_URL}all`, { headers: authHeader() });

const getCardAuditLogList = (id) => axios.get(`${AUDIT_LOG_URL}card/${id}`, { headers: authHeader() });

const AuditLogService = {
	getAuditLogsList,
	getCardAuditLogList,
};

export default AuditLogService;
