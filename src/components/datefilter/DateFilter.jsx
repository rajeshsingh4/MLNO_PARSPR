import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getDateRange } from '@/utils/helpers/dateHandlers';

export default function DateRangeFilter(props) {
	const { handleDateRange } = props;
	const [selectedDateRange, setSelectedDateRange] = useState('all');

	const handleDateChange = async (e) => {
		const { value } = e.target;
		const sortType = value;
		let dateRange = getDateRange('all');
		switch (value) {
			case 'all':
				console.log('show all data');
				break;
			case 'today':
				dateRange = getDateRange('currentDay');
				break;
			case 'yesterday':
				dateRange = getDateRange('yesterday');
				break;
			case 'week':
				dateRange = getDateRange('currentWeek');
				break;
			case 'lastWeek':
				dateRange = getDateRange('lastWeek');
				break;
			case 'currentMonth':
				dateRange = getDateRange('currentMonth');
				break;
			case 'lastMonth':
				dateRange = getDateRange('lastMonth');
				break;
			case 'threeMonths':
				dateRange = getDateRange('threeMonths');
				break;
			default:
				console.log('default show all data');
				break;
		}
		setSelectedDateRange(sortType);
		handleDateRange(sortType, dateRange);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 240 }}>
			<InputLabel id="dashboard-date-range-label">Select Date Range</InputLabel>
			<Select
				labelId="dashboard-date-range-label"
				id="dashboard-date-range"
				value={selectedDateRange}
				label="Select Date Range"
				onChange={handleDateChange}
			>
				<MenuItem value="all">
					<em>All</em>
				</MenuItem>
				<MenuItem value="today">Current Day</MenuItem>
				<MenuItem value="yesterday">Yesterday</MenuItem>
				<MenuItem value="week">This week</MenuItem>
				<MenuItem value="currentMonth">This month</MenuItem>
				<MenuItem value="lastMonth">Last month</MenuItem>
				<MenuItem value="threeMonths">Past 3 months</MenuItem>
			</Select>
		</FormControl>
	);
}
