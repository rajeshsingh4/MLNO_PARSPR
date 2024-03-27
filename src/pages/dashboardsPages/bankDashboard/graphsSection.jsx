import useAutoCounter from '@hooks/useAutoCounter';

import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function GraphsSection(props) {
	const { stackedBarChartConfig, doubleAreaChartConfig } = props;
	return (
		<section>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={6}>
					<DoubleAreaChartSection doubleAreaChartConfig={doubleAreaChartConfig} />
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={12}>
							<StackedBarChartSection stackedBarChartConfig={stackedBarChartConfig} />
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<AreaChartSection1 />
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<AreaChartSection2 />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</section>
	);
}

export function SectionContainer({ children, background }) {
	return (
		<Card
			sx={{
				position: 'relative',
				height: '100%',
			}}
		>
			<Box position="absolute" top="0" bottom="0" left="0" right="0">
				{background}
			</Box>
			{children}
		</Card>
	);
}

function DoubleAreaChartSection(props) {
	const { doubleAreaChartConfig } = props;
	// const counter = useAutoCounter({
	// 	limiter: 0.0345,
	// 	increment: 0.001,
	// 	interval: 10,
	// });
	return (
		<SectionContainer
			background={
				<Chart
					options={doubleAreaChartConfig.options}
					series={doubleAreaChartConfig.series}
					type="area"
					style={{
						position: 'absolute',
						bottom: '10px',
						left: '10px',
						right: '10px',
					}}
					width="100%"
					height="70%"
				/>
			}
		/>
	);
}

// const barGraphconfig = {
// 	options: {
// 		colors: getDefaultChartsColors(2),
// 		plotOptions: {
// 			bar: {
// 				columnWidth: '95%',
// 			},
// 		},
// 		chart: {
// 			toolbar: {
// 				show: false,
// 			},
// 			sparkline: {
// 				enabled: true,
// 			},
// 			parentHeightOffset: 0,
// 		},
// 		grid: {
// 			show: false,
// 		},
// 		xaxis: {
// 			show: false,

// 			categories: [1],
// 		},
// 		tooltip: {
// 			enabled: true,
// 		},
// 		yaxis: {
// 			show: false,
// 		},
// 	},
// 	series: [
// 		{
// 			name: 'HDFC',
// 			data: [5],
// 		},
// 		{
// 			name: 'IDFC',
// 			data: [5],
// 		},
// 		{
// 			name: 'SBI',
// 			data: [100],
// 		},
// 	],
// };

// function BarChartSection() {
// 	const counter = useAutoCounter({
// 		limiter: 0.0873,
// 		increment: 0.001,
// 		interval: 10,
// 	});
// 	return (
// 		<SectionContainer
// 			background={
// 				<Chart
// 					options={barGraphconfig.options}
// 					series={barGraphconfig.series}
// 					type="bar"
// 					style={{
// 						position: 'absolute',
// 						bottom: '0',
// 						left: '0',
// 						right: '0',
// 					}}
// 					width="100%"
// 					height="90%"
// 				/>
// 			}
// 		>
// 			<Stack ml="auto" width="50%" spacing={0}>
// 				<Typography variant="subtitle1" fontSize={35}>
// 					{Math.round(counter * 10000) / 10000}{' '}
// 					<Typography variant="subtitle1" component="span">
// 						ETH
// 					</Typography>
// 				</Typography>
// 				<Typography variant="subtitle1">ETHEREUM WALLET</Typography>
// 				<Typography variant="subtitle2">
// 					Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus...
// 				</Typography>
// 				<Button
// 					variant="text"
// 					size="small"
// 					endIcon={<ChevronRightIcon />}
// 					sx={{
// 						width: 'fit-content',
// 						textTransform: 'uppercase',
// 					}}
// 				>
// 					View Report
// 				</Button>
// 			</Stack>
// 		</SectionContainer>
// 	);
// }

export function StackedBarChartSection(props) {
	const { stackedBarChartConfig } = props;
	// const counter = useAutoCounter({
	// 	limiter: 0.0873,
	// 	increment: 0.001,
	// 	interval: 10,
	// });
	return (
		<SectionContainer background={null}>
			<Chart options={stackedBarChartConfig.options} series={stackedBarChartConfig.series} type="bar" />
		</SectionContainer>
	);
}

const areaChartConfig1 = {
	options: {
		colors: getDefaultChartsColors(3),
		chart: {
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		stroke: {
			curve: 'straight',
			width: 1,
		},
		markers: {
			size: 4,
		},
		grid: {
			show: false,
		},
		xaxis: {
			show: false,
		},
		tooltip: {
			enabled: false,
		},
		yaxis: {
			show: false,
		},
	},
	series: [
		{
			name: 'series-1',
			data: [5, 7, 7, 9, 8, 10, 11, 8, 7, 6, 9, 7, 10, 11],
		},
	],
};

function AreaChartSection1() {
	const counter = useAutoCounter({
		limiter: 29931,
		increment: 1000,
		interval: 10,
	});
	return (
		<SectionContainer
			background={
				<Chart
					options={areaChartConfig1.options}
					series={areaChartConfig1.series}
					type="area"
					style={{
						position: 'absolute',
						bottom: '-10px',
						left: '-10px',
						right: '-10px',
					}}
					width="100%"
					height="30%"
				/>
			}
		>
			<Stack spacing={0} direction="column" width="100%" justifyContent="center" alignItems="center">
				<Typography variant="subtitle1" fontSize={35}>
					{counter.toLocaleString()}
				</Typography>
				<Typography variant="subtitle1">MALE VISITORS</Typography>
				<Typography variant="subtitle2" color="text.secondary" pb={2}>
					Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus...
				</Typography>
			</Stack>
		</SectionContainer>
	);
}
const areaChartConfig2 = {
	options: {
		colors: getDefaultChartsColors(4),
		chart: {
			toolbar: {
				show: false,
			},
			sparkline: {
				enabled: true,
			},
			parentHeightOffset: 0,
		},
		stroke: {
			curve: 'straight',
			width: 1,
		},
		markers: {
			size: 4,
		},
		grid: {
			show: false,
		},
		xaxis: {
			show: false,
		},
		tooltip: {
			enabled: false,
		},
		yaxis: {
			show: false,
		},
	},
	series: [
		{
			name: 'series-1',
			data: [5, 7, 7, 10, 8, 10, 7, 6, 7, 7, 8, 7, 11, 10],
		},
	],
};

function AreaChartSection2() {
	const counter = useAutoCounter({
		limiter: 45231,
		increment: 1000,
		interval: 10,
	});
	return (
		<SectionContainer
			background={
				<Chart
					options={areaChartConfig2.options}
					series={areaChartConfig2.series}
					type="area"
					style={{
						position: 'absolute',
						bottom: '-10px',
						left: '-10px',
						right: '-10px',
					}}
					width="100%"
					height="30%"
				/>
			}
		>
			<Stack spacing={0} direction="column" width="100%" justifyContent="center" alignItems="center">
				<Typography variant="subtitle1" fontSize={35}>
					{counter.toLocaleString()}
				</Typography>
				<Typography variant="subtitle1">FEMALE VISITORS</Typography>
				<Typography variant="subtitle2" color="text.secondary" pb={2}>
					Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus...
				</Typography>
			</Stack>
		</SectionContainer>
	);
}

export default GraphsSection;
