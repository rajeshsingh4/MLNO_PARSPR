export const getDateRange = (type) => {
	const currentDate = new Date();
	let startDate = new Date();
	let endDate = new Date();
	const timeSubtract = 24 * 60 * 60 * 1000;
	if (type === 'currentWeek') {
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
