export const actionList = [
	{
		label: 'Destroy',
		value: 'destroy',
	},
	{
		label: 'HOLD',
		value: 'hold',
	},
	{
		label: 'Accelerate',
		value: 'accelerate',
	},
	{
		label: 'Re-direct',
		value: 'redirect',
	},
	{
		label: 'Change courier',
		value: 'changecourier',
	},
	{
		label: 'New value',
		value: 'newvalue',
	},
	{
		label: 'Block Card (lost in transit)',
		value: 'blockcard',
	},
	{
		label: 'Reject Record (could be a range of records separated by - or ,)',
		value: 'rejectrecord',
	},
	{
		label: 'Reject File',
		value: 'rejectfile',
	},
];

export const actionListMap = {
	destroy: 'Destroy',
	hold: 'HOLD',
	accelerate: 'Accelerate',
	redirect: 'Re-direct',
	changecourier: 'Change courier',
	newvalue: 'New value',
	blockcard: 'Block Card (lost in transit)',
	rejectrecord: 'Reject Record (could be a range of records separated by - or ,)',
	rejectfile: 'Reject File',
};

export const modeList = [
	{
		label: 'Phone',
		value: 'phone',
	},
	{
		label: 'E-mail',
		value: 'email',
	},
	{
		label: 'WhatsApp',
		value: 'whatsapp',
	},
	{
		label: 'SMS',
		value: 'sms',
	},
	{
		label: 'In-Person',
		value: 'inperson',
	},
	{
		label: 'Other',
		value: 'other',
	},
];

export const modeLsitMap = {
	phone: 'Phone',
	email: 'E-mail',
	whatsapp: 'WhatsApp',
	sms: 'SMS',
	inperson: 'In-Person',
	other: 'Other',
};

export const breadcrumbNameMap = {
	'/profile': 'User Profile',
	'/bureau-comparision': 'Bureau Comparision',
	'/bureau-reports': 'Pending Bureau Reports',
	'/files': 'File Wise Tracking',
	'/files/:id': 'File Wise Tracking Cards',
	'/file-tat-report': 'File TAT Report',
	'/bank-pull-request': 'Bank Pull Request',
	'/bank-pull-request/create': 'Create Pull Request',
	'/bank-pull-request/manage': 'Manage Pull Request',
	'/bank-pull-request/view': 'View Pull Request',
	'/bank-pull-request/view/:id': 'View Pull Request Details',
	'/bureau-pull-request': 'Bureau Pull Request',
	'/bureau-pull-request/create': 'View Pull Request',
	'/bureau-pull-request/manage': 'Manage Pull Request',
	'/bureau-pull-request/view': 'View Pull Request Details',
	'/bureau-pull-request/view/:id': 'View Pull Request',
};

export const bureauStatusMap = {
	0: 'Receive',
	1: 'Complete',
	2: 'In-Progress',
	3: 'Sent to Courier',
	4: 'Archive',
	5: 'Abort',
	6: 'Delete',
};

export const bureauStatusColorMap = {
	0: 'info',
	1: 'success',
	2: 'warning',
	3: 'success',
	4: 'default',
	5: 'error',
	6: 'error',
};

export const courierStatusMap = {
	0: 'Received',
	1: 'Completed',
	2: 'In-Transit',
	3: 'Delivered',
	4: 'Archived',
	5: 'Dispatched',
	6: 'Lost',
	7: 'Returned to bank',
	8: 'Re-attempt delivery',
};

export const courierStatusColorMap = {
	0: 'info',
	1: 'success',
	2: 'warning',
	3: 'success',
	4: 'default',
	5: 'warning',
	6: 'error',
	7: 'warning',
	8: 'info',
};

export const pullRequestStatusMap = {
	0: 'Create',
	1: 'Complete',
	2: 'Reject',
	3: 'Delete',
};

export const pullRequestStatusColorMap = {
	0: 'default',
	1: 'success',
	2: 'warning',
	3: 'error',
};
