import useAutoCounter from '@hooks/useAutoCounter';
// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

function StatsSection(props) {
	const { STATS_DATA } = props;
	return (
		<Grid
			container
			sx={{
				borderRadius: 1,
				overflow: 'hidden',
				bgcolor: 'background.paper',
				boxShadow: 26,
				'--Grid-borderWidth': '1px',
				borderTop: 'var(--Grid-borderWidth) solid',
				borderLeft: 'var(--Grid-borderWidth) solid',
				borderColor: 'border',
				'& > div': {
					borderRight: 'var(--Grid-borderWidth) solid',
					borderBottom: 'var(--Grid-borderWidth) solid',
					borderColor: 'border',
				},
			}}
		>
			{STATS_DATA.map((stat, index) => (
				<Grid item xs={12} sm={6} md={3} key={index}>
					<StatSection statData={stat} />
				</Grid>
			))}
		</Grid>
	);
}

function StatSection({ statData }) {
	const { name, total, color, Icon } = statData;
	const counter = useAutoCounter({
		limiter: total,
		increment: 5000,
		interval: 10,
	});

	return (
		<Stack p={3} direction="row" spacing={3} alignItems="center">
			{Icon && (
				<Icon
					sx={{
						fontSize: 60,
						color,
					}}
					color="disabled"
				/>
			)}
			<span>
				<Typography color={color} variant="h5" textTransform="uppercase">
					{name}
				</Typography>
				<Typography fontSize={30}>{counter.toLocaleString()}</Typography>
			</span>
		</Stack>
	);
}

export default StatsSection;
