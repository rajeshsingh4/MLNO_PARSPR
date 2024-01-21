import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Chip from '@mui/material/Chip';
import { bureauStatusMap, bureauStatusColorMap } from '@/utils/bureaumappings';

// import { v4 as uuid } from 'uuid';
// import Box from '@mui/material/Box';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function CardsSection(props) {
	const { recentCards } = props;
	return (
		<Card type="none">
			<Stack direction="column" alignItems="flex-start">
				<Typography variant="h5" textTransform="uppercase" m={2}>
					Recent Cards
				</Typography>
				<CardsTable recentCards={recentCards} />
				<Button
					size="small"
					startIcon={<KeyboardArrowDownIcon />}
					sx={{
						m: 1,
					}}
				>
					View All
				</Button>
			</Stack>
		</Card>
	);
}

const STATUS_CONFIG = {
	success: {
		color: 'success.main',
	},
	error: {
		color: 'error.main',
	},
	warning: {
		color: 'warning.light',
	},
};

function CardsTable(props) {
	const { recentCards } = props;
	return (
		<TableContainer>
			<Table aria-label="recent cards listing" size="medium">
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell align="left" padding="none">
							Bank
						</TableCell>
						<TableCell align="center">Status</TableCell>
						<TableCell align="center">Updated At</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{recentCards.map((card) => (
						<CardTableRow key={card.id} card={card} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function CardTableRow({ card }) {
	const { id, bank, status, bureauStatus, updatedAt, courierStatus } = card;
	return (
		<TableRow hover>
			<TableCell>{id}</TableCell>
			<TableCell align="left" padding="none">
				<Link
					href="#!"
					variant="subtitle1"
					underline="hover"
					color="text.primary"
					sx={{
						display: 'block',
						'&:hover': {
							color: 'primary.main',
						},
					}}
				>
					{bank}
				</Link>
				{/* <Stack direction="row" alignItems="center" spacing={1}>
					<Box
						component="span"
						width={8}
						height={8}
						// bgcolor={STATUS_CONFIG[stock?.status]?.color || '#d3d3d3'}
						borderRadius="50%"
					/>
					<Typography variant="caption" color="text.tertiary">
						{status}
					</Typography>
				</Stack> */}
			</TableCell>
			<TableCell align="center">
				<Stack direction="column" alignItems="center" spacing={1}>
					<Typography variant="body1" color="text.tertiary">
						{/* eslint-disable-next-line no-nested-ternary */}
						{bureauStatus === 1 ? (courierStatus === 1 ? '' : 'With courier') : 'With Bureau'}
					</Typography>
					<Chip label={bureauStatusMap[status]} size="small" color={bureauStatusColorMap[status]} />
				</Stack>
			</TableCell>
			<TableCell align="center">
				<Typography variant="body1" color="text.tertiary">
					{updatedAt}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<IconButton size="small">
					<MoreHorizIcon fontSize="small" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default CardsSection;
