import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PageHeader from '@/components/pageHeader';

// import WelcomeSection from '@/pages/dashboardsPages/bankDashboard/welcomeSection';
// import StatsSection from '@/pages/dashboardsPages/bankDashboard/statsSection';
// import GraphsSection from '@/pages/dashboardsPages/bankDashboard/graphsSection';
// import BitcoinSection from '@/pages/dashboardsPages/bankDashboard/bitcoinSection';
import { StackedBarChartSection } from '@/pages/dashboardsPages/bankDashboard/graphsSection';
import PullRequestService from '@/utils/services/pull-request.service';
import { useEffect, useState } from 'react';
// import ProductsSection from '@/pages/dashboardsPages/bankDashboard/productsSection';
// import TransactionsSection from '@/pages/dashboardsPages/bankDashboard/transactionsSection';

// import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
// import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
// import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

// const SAMPLE_STATS_DATA = [
// 	{
// 		id: 1,
// 		color: 'secondary.main',
// 		name: 'Total Cards',
// 		total: 822490,
// 		Icon: DonutSmallOutlinedIcon,
// 	},
// 	{
// 		id: 2,
// 		color: 'cuaternary.main',
// 		name: 'With Bureau',
// 		total: 465183,
// 		Icon: QueryStatsOutlinedIcon,
// 	},
// 	{
// 		id: 3,
// 		color: 'tertiary.400',
// 		name: 'With Courier',
// 		total: 781524,
// 		Icon: AssessmentOutlinedIcon,
// 	},
// 	{
// 		id: 4,
// 		color: 'success.main',
// 		name: 'Completed',
// 		total: 369657,
// 		Icon: MonetizationOnOutlinedIcon,
// 	},
// ];

function BankPullRequestDashboard() {
	const [dashboardDetails, setDashboardDeatils] = useState(null);
	const [dashboardDetailsLoader, setDashboardDeatilsLoader] = useState(true);

	const getDashboardForPullRequest = async () => {
		setDashboardDeatilsLoader(true);
		try {
			const pullRequestResp = await PullRequestService.getBankDashboardDetails();
			setDashboardDeatils(pullRequestResp.data);
		} catch (err) {
			console.error('Error fetching pull request details ', err);
		} finally {
			setDashboardDeatilsLoader(false);
		}
	};

	useEffect(() => {
		getDashboardForPullRequest();
	}, []);

	const createStackBarChartConfig = (stats) => {
		const createSeries = () => {
			const series = [];
			stats.forEach((item) => {
				const sItem = {
					name: '',
					data: [item.total_bank_records],
				};
				if (item.Bureau_Status !== 1 && (item.Courier_Status === null || item.Courier_Status === undefined)) {
					sItem.name = 'Bureau In-Progress';
				} else if (item.Courier_Status !== 1 && item.Bureau_Status === 1) {
					sItem.name = 'Courier In-Progress';
				} else if (item.Bureau_Status === 1 && item.Courier_Status === 1) {
					sItem.name = 'Completed';
				} else {
					console.log(
						'invalid bureau statuss: ',
						item.Bureau_Status,
						' invalid courier status: ',
						item.Courier_Status,
					);
				}
				series.push(sItem);
			});
			return series;
		};
		const stackChartConfig = {
			options: {
				chart: {
					type: 'bar',
					height: 350,
					stacked: true,
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					bar: {
						horizontal: false,
						dataLabels: {
							total: {
								enabled: false,
								offsetX: 1,
								style: {
									fontSize: '13px',
									fontWeight: 900,
								},
							},
						},
					},
				},
				stroke: {
					width: 1,
					colors: ['#fff'],
				},
				title: {
					text: 'Status',
				},
				xaxis: {
					categories: stats && stats.length ? [...new Set(stats.map((item) => item.Bank))] : [],
					labels: {
						formatter(val) {
							return val;
						},
					},
					title: {
						text: undefined,
					},
				},
				yaxis: {
					title: {
						text: undefined,
					},
				},
				tooltip: {
					y: {
						formatter(val) {
							return val;
						},
					},
				},
				fill: {
					opacity: 1,
				},
				legend: {
					position: 'top',
					horizontalAlign: 'left',
					offsetX: 40,
				},
			},
			series: stats && stats.length ? createSeries() : [],
		};
		return stackChartConfig;
	};

	return (
		<>
			<PageHeader title="Dashboard">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
				</Breadcrumbs>
			</PageHeader>
			{/* <WelcomeSection /> */}
			<Stack spacing={3}>
				{/* <StatsSection STATS_DATA={SAMPLE_STATS_DATA} /> */}
				{/* <GraphsSection /> */}
				<section>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={6}>
							<StackedBarChartSection
								stackedBarChartConfig={createStackBarChartConfig(dashboardDetails)}
							/>
						</Grid>
						<Grid item xs={12} md={12} lg={6}>
							{/* <TransactionsSection /> */}
						</Grid>
					</Grid>
				</section>
				{/* <BitcoinSection /> */}
			</Stack>
		</>
	);
}

export default BankPullRequestDashboard;
