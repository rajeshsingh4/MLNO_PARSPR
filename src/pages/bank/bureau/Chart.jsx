import { useTheme } from '@mui/material/styles';

import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';
import Box from '@mui/material/Box';

const createTATData = (files) => {
    let outsideTAT = 0, withinTAT = 0;
    files.forEach(file => {
      outsideTAT += file.bureauoutsidetat;
      withinTAT += file.bureauwithintat;
    })
    return [outsideTAT, withinTAT];
}

const getCustomerGraphConfig = (config, files) => ({
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
	datasets: [{
		data: createTATData(files),
		backgroundColor: [
		  'rgb(255, 99, 132)',
		  'rgb(54, 162, 235)'
		],
		hoverOffset: 4
	}],
	series: createTATData(files),
});
function ChartPie(props) {
	const { files } = props;
	const theme = useTheme();

	return (
		<Box
			color="text.primary"
			component={Chart}
			options={getCustomerGraphConfig({ mode: theme.palette.mode }, files)?.options}
			series={getCustomerGraphConfig({ mode: theme.palette.mode }, files)?.series}
			type="donut"
			width="80%"
			height="80%"
			mb={12}
			mt={2}
		/>
	);
}

export default ChartPie;
