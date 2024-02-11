export const getDateRange = (type) => {
	const currentDate = new Date();
	// current day from 00:00 hrs
	let startDate = new Date(new Date().setHours(0, 0, 0, 0, 0));
	// current time
	let endDate = new Date();
	const timeSubtract = 24 * 60 * 60 * 1000;
	if (type === 'yesterday') {
		startDate = new Date(startDate.getTime() - 1 * timeSubtract);
		endDate = new Date(endDate.setHours(23, 59, 59, 59));
	} else if (type === 'currentWeek') {
		startDate = new Date(currentDate.getTime() - 7 * timeSubtract);
	} else if (type === 'lastWeek') {
		startDate = new Date(currentDate.getTime() - 14 * timeSubtract);
		endDate = new Date(currentDate.getTime() - 7 * timeSubtract);
	} else if (type === 'currentMonth') {
		startDate = new Date(currentDate.getTime() - 30 * timeSubtract);
	} else if (type === 'lastMonth') {
		startDate = new Date(currentDate.getTime() - 60 * timeSubtract);
		endDate = new Date(currentDate.getTime() - 30 * timeSubtract);
	} else if (type === 'threeMonths') {
		startDate = new Date(currentDate.getTime() - 90 * timeSubtract);
	}
	return { startDate, endDate };
};

export const getCurrentTime = () => new Date();
