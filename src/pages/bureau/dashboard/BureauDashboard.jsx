import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PageHeader from '@/components/pageHeader';
import StatsSection from '@/pages/dashboardsPages/bankDashboard/statsSection';
import GraphsSection from '@/pages/dashboardsPages/bankDashboard/graphsSection';
import BitcoinSection from '@/pages/dashboardsPages/bankDashboard/bitcoinSection';
import ProductsSection from '@/pages/dashboardsPages/bankDashboard/productsSection';
import TransactionsSection from '@/pages/dashboardsPages/bankDashboard/transactionsSection';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';
import DashboradService from '@/utils/services/dashboards.service';
import Loader from '@/components/loader';
import { getDateRange } from '@/utils/helpers/dateHandlers';

function BureauDashboardPage() {
	const [statsData, setStatsData] = useState(null);
	const [statsDataLoader, setStatsDataLoader] = useState(true);
	const [selectedDateRange, setSelectedDateRange] = useState('all');
	const navigate = useNavigate();

	const getStatsData = async (queryParams) => {
		setStatsDataLoader(true);
		try {
			const pullRequestResp = await DashboradService.getBureauDashboardDetails(queryParams);
			setStatsData(pullRequestResp.data);
		} catch (err) {
			console.error('Error fetching pull request details ', err);
		} finally {
			setStatsDataLoader(false);
		}
	};

	useEffect(() => {
		const dateRange = getDateRange(selectedDateRange);
		getStatsData(
			`?sortType=${selectedDateRange}${
				selectedDateRange !== 'all' ? `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}` : ''
			}`,
		);
	}, []);

	const transformStatsData = (stats) => {
		if (!stats || !stats.cards) {
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
		stats.cards.forEach((item) => {
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
			stats.cards.forEach((item) => {
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
			series: stats && stats.cards ? getAreaSeries() : [],
		};
		return areaChartConfig;
	};

	const createStackBarChartConfig = (stats) => {
		const createSeries = () => {
			const series = [];
			stats.cards.forEach((item) => {
				const sItem = {
					bank: item.Bank,
					name: '',
					data: [],
				};
				if (item.Bureau_Status === 1 && item.Courier_Status === 1) {
					sItem.name = 'Delivered';
				} else if (item.Courier_Status !== 1 && item.Bureau_Status === 1) {
					sItem.name = 'In transit';
				} else {
					sItem.name = 'Bureau In-Progress';
				}
				const foundPreviousItem = series.find((i) => i.Bank === sItem.Bank && i.name === sItem.name);
				if (foundPreviousItem) {
					foundPreviousItem.data =
						sItem.data.length > 0 ? [sItem.data[0] + item.total_bank_records] : [item.total_bank_records];
				} else {
					sItem.data =
						sItem.data.length > 0 ? [sItem.data[0] + item.total_bank_records] : [item.total_bank_records];
					series.push(sItem);
				}
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
					categories: stats && stats.cards ? [...new Set(stats.cards.map((item) => item.Bank))] : [],
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
			series: stats && stats.cards ? createSeries() : [],
		};
		return stackChartConfig;
	};

	const createRecentCardsDetails = (stats) => {
		if (!stats || !stats.recentCards) {
			return [];
		}
		const recentCardsList = [];
		stats.recentCards.forEach((card) => {
			const item = {
				id: card.id,
				bank: card.Bank,
				bureauName: card.fileMaster.BureauName,
				status: card.Bureau_Status === 1 ? card.Courier_Status : card.Bureau_Status,
				bureauStatus: card.Bureau_Status,
				courierStatus: card.courierStatus,
				updatedAt: new Date(card.updatedAt).toLocaleString(),
			};
			recentCardsList.push(item);
		});
		return recentCardsList;
	};

	const createRecentFiles = (stats) => {
		if (!stats || !stats.recentFiles) {
			return [];
		}
		const recentFileList = [];
		stats.recentFiles.forEach((file) => {
			const item = {
				id: file.id,
				name: file.fileName,
				bureauName: file.BureauName,
				cutOffTime: new Date(file.CutOffTime).toLocaleString(),
				updatedBy: file.modifiedBy,
				updatedAt: new Date(file.updatedAt).toLocaleString(),
			};
			recentFileList.push(item);
		});
		console.log(recentFileList);
		return recentFileList;
	};

	const createRecentPullRequests = (stats) => {
		if (!stats || !stats.recentPullRequests) {
			return [];
		}
		const recentPullRequestList = [];
		stats.recentPullRequests.forEach((pull) => {
			const item = {
				id: pull.id,
				status: pull.status,
				comment: pull.comment,
				updatedBy: pull.modifiedBy,
				updatedAt: new Date(pull.updatedAt).toLocaleString(),
			};
			recentPullRequestList.push(item);
		});
		return recentPullRequestList;
	};

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
		const queryParams =
			sortType === 'all'
				? `?sortType=${sortType}`
				: `?sortType=${sortType}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
		await getStatsData(queryParams);
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
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Card elevation={0}>
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
						</Card>
					</Grid>
				</Grid>
				{statsDataLoader ? (
					<Loader
						addSx={{
							mt: 5,
						}}
					/>
				) : (
					<>
						<StatsSection STATS_DATA={transformStatsData(statsData)} />
						<GraphsSection
							doubleAreaChartConfig={createBankWiseAreaChartConfig(statsData)}
							stackedBarChartConfig={createStackBarChartConfig(statsData)}
						/>
						<section>
							<Grid container spacing={3}>
								<Grid item xs={12} md={12} lg={6}>
									<ProductsSection
										recentCards={createRecentCardsDetails(statsData)}
										navigateCards={() => navigate('/bureau/pull/cards')}
									/>
								</Grid>
								<Grid item xs={12} md={12} lg={6}>
									<TransactionsSection
										recentPullRequests={createRecentPullRequests(statsData)}
										navigatePullRequests={() => navigate('/bureau/pull/list')}
									/>
								</Grid>
							</Grid>
						</section>
						<BitcoinSection />
					</>
				)}
			</Stack>
		</>
	);
}

export default BureauDashboardPage;
