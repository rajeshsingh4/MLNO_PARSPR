import { useTheme } from '@mui/material/styles';

import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';
import Box from '@mui/material/Box';

const getCustomerGraphConfig = (config) => ({
	options: {
		colors: getDefaultChartsColors(4),
		chart: {
			...(config?.mode === 'dark' && { foreColor: '#fff' }),
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		labels: ['Within TAT', 'OutSide TAT'],
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'left',
			formatter(seriesName, opts) {
				return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex].toLocaleString()];
			},
			fontFamily: 'inherit',
			fontSize: 13,
			floating: true,
			offsetY: 80,
			markers: {
				width: 15,
				height: 15,
			},
		},
		tooltip: {
			formatter(value) {
				return (+value).toLocaleString();
			},
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							fontFamily: 'inherit',
							fontSize: 13,
						},
						value: {
							formatter(value) {
								return (+value).toLocaleString();
							},
						},
						total: {
							show: true,
						},
					},
				},
			},
		},
	},
	series: [9212, 8768],
});
function ChartPie() {
	const theme = useTheme();

	return (
		<Box
			color="text.primary"
			component={Chart}
			options={getCustomerGraphConfig({ mode: theme.palette.mode })?.options}
			series={getCustomerGraphConfig()?.series}
			type="donut"
			width="80%"
			height="80%"
			mb={12}
			mt={2}
		/>
	);
}

export default ChartPie;
