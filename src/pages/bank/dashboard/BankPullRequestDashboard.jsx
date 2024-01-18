import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PageHeader from '@/components/pageHeader';

// import WelcomeSection from '@/pages/dashboardsPages/bankDashboard/welcomeSection';
// import StatsSection from '@/pages/dashboardsPages/bankDashboard/statsSection';
// import GraphsSection from '@/pages/dashboardsPages/bankDashboard/graphsSection';
import BitcoinSection from '@/pages/dashboardsPages/bankDashboard/bitcoinSection';
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
				{/* <GraphsSection />
				<section>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={6}>
							<ProductsSection />
						</Grid>
						<Grid item xs={12} md={12} lg={6}>
							<TransactionsSection />
						</Grid>
					</Grid>
				</section> */}
				<BitcoinSection />
			</Stack>
		</>
	);
}

export default BankPullRequestDashboard;
