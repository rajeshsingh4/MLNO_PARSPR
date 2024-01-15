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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/material/Chip';
import { pullRequestStatusMap, pullRequestStatusColorMap } from '@/utils/bureaumappings';

function TransactionsSection({ recentPullRequests }) {
	return (
		<Card type="none">
			<Stack direction="column" alignItems="flex-start">
				<Typography variant="h5" textTransform="uppercase" m={2}>
					Recent Pull Requests
				</Typography>
				<TransactionsTable recentPullRequests={recentPullRequests} />
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

function TransactionsTable({ recentPullRequests }) {
	return (
		<TableContainer>
			<Table aria-label="recent pull requests table" size="medium">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell align="left">Latest comment</TableCell>
						<TableCell align="left">Status</TableCell>
						<TableCell align="left">Updated By</TableCell>
						<TableCell align="left">Updated At</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{recentPullRequests.map((pull) => (
						<TransactionRow key={pull.id} pull={pull} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function TransactionRow({ pull }) {
	const { id, comment, status, updatedBy, updatedAt } = pull;
	return (
		<TableRow hover>
			<TableCell>{id}</TableCell>
			<TableCell align="left">
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
					{comment}
				</Link>
			</TableCell>
			<TableCell align="left" size="small">
				{/* <Typography variant="body1" color="text.tertiary">
					{bureauStatus === 1 ? (courierStatus === 1 ? '' : 'With courier') : 'With Bureau'}
				</Typography> */}
				<Chip label={pullRequestStatusMap[status]} size="small" color={pullRequestStatusColorMap[status]} />
			</TableCell>
			<TableCell align="left" size="small">
				<Typography variant="body1" color="text.tertiary">
					{updatedBy}
				</Typography>
			</TableCell>
			<TableCell align="left" size="small">
				<Typography variant="body1" color="text.tertiary">
					{updatedAt}
				</Typography>
			</TableCell>
		</TableRow>
	);
}

export default TransactionsSection;
