import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PageHeader from '@/components/pageHeader';
import StatsSection from '@/pages/dashboardsPages/bankDashboard/statsSection';
import GraphsSection from '@/pages/dashboardsPages/bankDashboard/graphsSection';
import BitcoinSection from '@/pages/dashboardsPages/bankDashboard/bitcoinSection';
import ProductsSection from '@/pages/dashboardsPages/bankDashboard/productsSection';
import TransactionsSection from '@/pages/dashboardsPages/bankDashboard/transactionsSection';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';
import DashboradService from '@/utils/services/dashboards.service';

function BureauDashboardPage() {
	const [statsData, setStatsData] = useState(null);
	const [statsDataLoader, setStatsDataLoader] = useState(true);

	const getStatsData = async () => {
		setStatsDataLoader(true);
		try {
			const pullRequestResp = await DashboradService.getBureauDashboardDetails();
			setStatsData(pullRequestResp.data);
		} catch (err) {
			console.error('Error fetching pull request details ', err);
		} finally {
			setStatsDataLoader(false);
		}
	};

	useEffect(() => {
		getStatsData();
	}, []);

	const transformStatsData = (stats) => {
		if (!stats || !stats.bank) {
			return [];
		}
		const iconNameList = {
			0: {
				id: 0,
				name: 'Total Cards',
				color: 'secondary.main',
				total: stats.totalCards,
				Icon: DonutSmallOutlinedIcon,
			},
			1: {
				id: 1,
				name: 'WITH BUREAU',
				color: 'cuaternary.main',
				total: 0,
				Icon: QueryStatsOutlinedIcon,
			},
			2: {
				id: 2,
				name: 'WITH COURIER',
				color: 'tertiary.400',
				total: 0,
				Icon: AssessmentOutlinedIcon,
			},
			3: {
				id: 3,
				name: 'COMPLETED',
				color: 'success.main',
				total: 0,
				Icon: MonetizationOnOutlinedIcon,
			},
		};

		const transformedStats = [iconNameList[0]];
		stats.bank.forEach((item) => {
			const isBureauCompleted = item.Bureau_Status === 1;
			const isCourierCompleted = item.Courier_Status === 1;
			const isCompleted = isBureauCompleted && isCourierCompleted;
			const isWithBureau = item.Bureau_Status !== 1;
			const isWithCourier = item.Courier_Status !== 1;
			let id;
			const total = item.total_bank_records;
			if (isCompleted) {
				id = 3;
			}
			if (isWithCourier) {
				id = 2;
			}
			if (isWithBureau) {
				id = 1;
			}
			const foundStatDataWithSameName = transformedStats.find((x) => x.id === id);
			if (foundStatDataWithSameName) {
				foundStatDataWithSameName.total += total;
			} else {
				transformedStats.push({ ...iconNameList[id], total });
			}
		});
		return transformedStats;
	};

	const createBankWiseAreaChartConfig = (stats) => {
		const getAreaSeries = () => {
			const series = [];
			stats.bureau.forEach((item) => {
				const foundSeries = series.find((it) => it.name === item.Bank);
				if (foundSeries) {
					foundSeries.data.push(item.total_bank_records);
				} else {
					series.push({
						name: item.Bank,
						data: [item.total_bank_records],
					});
				}
			});
			return series;
		};

		const areaChartConfig = {
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
					width: 2,
				},
				markers: {
					size: 5,
				},
				grid: {
					show: false,
				},
				xaxis: {
					show: false,
				},
				tooltip: {
					enabled: true,
				},
				yaxis: {
					show: false,
				},
			},
			series: stats && stats.bureau ? getAreaSeries() : [],
		};
		return areaChartConfig;
	};

	const createStackBarChartConfig = (stats) => {
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
						horizontal: true,
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
					categories: stats && stats.bureau ? [...new Set(stats.bureau.map((item) => item.Bank))] : [],
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
			series: [
				{
					name: 'Bureau In-Progress',
					data:
						stats && stats.bureau
							? stats.bureau
									.map((item) => {
										if (item.Bureau_Status !== 1) {
											return item.total_bank_records;
										}
										return null;
									})
									.filter((it) => it)
							: [],
				},
				{
					name: 'Bureau Completed',
					data:
						stats && stats.bureau
							? stats.bureau
									.map((item) => {
										if (item.Bureau_Status === 1) {
											return item.total_bank_records;
										}
										return null;
									})
									.filter((it) => it)
							: [],
				},
				{
					name: 'Courier In-Progress',
					data:
						stats && stats.bureau
							? stats.bureau
									.map((item) => {
										if (item.Courier_Status !== 1) {
											return item.total_bank_records;
										}
										return null;
									})
									.filter((it) => it)
							: [],
				},
				{
					name: 'Courier Completed',
					data:
						stats && stats.bureau
							? stats.bureau
									.map((item) => {
										if (item.Courier_Status === 1) {
											return item.total_bank_records;
										}
										return null;
									})
									.filter((it) => it)
							: [],
				},
			],
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
			<Stack spacing={3}>
				<StatsSection STATS_DATA={transformStatsData(statsData)} />
				<GraphsSection
					doubleAreaChartConfig={createBankWiseAreaChartConfig(statsData)}
					stackedBarChartConfig={createStackBarChartConfig(statsData)}
				/>
				<section>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={6}>
							<ProductsSection />
						</Grid>
						<Grid item xs={12} md={12} lg={6}>
							<TransactionsSection />
						</Grid>
					</Grid>
				</section>
				<BitcoinSection />
			</Stack>
		</>
	);
}

export default BureauDashboardPage;
