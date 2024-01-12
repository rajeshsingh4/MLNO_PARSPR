import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import WelcomeSection from './welcomeSection';
import StatsSection from './statsSection';
import GraphsSection from './graphsSection';
import BitcoinSection from './bitcoinSection';
import ProductsSection from './productsSection';
import TransactionsSection from './transactionsSection';

import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const SAMPLE_STATS_DATA = [
	{
		id: 1,
		color: 'secondary.main',
		name: 'Total Cards',
		total: 822490,
		Icon: DonutSmallOutlinedIcon,
	},
	{
		id: 2,
		color: 'cuaternary.main',
		name: 'With Bureau',
		total: 465183,
		Icon: QueryStatsOutlinedIcon,
	},
	{
		id: 3,
		color: 'tertiary.400',
		name: 'With Courier',
		total: 781524,
		Icon: AssessmentOutlinedIcon,
	},
	{
		id: 4,
		color: 'success.main',
		name: 'Completed',
		total: 369657,
		Icon: MonetizationOnOutlinedIcon,
	},
];

function Dashboard1Page() {
	return (
		<>
			<WelcomeSection />
			<Stack spacing={3}>
				<StatsSection STATS_DATA={SAMPLE_STATS_DATA} />
				<GraphsSection />
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

export default Dashboard1Page;
