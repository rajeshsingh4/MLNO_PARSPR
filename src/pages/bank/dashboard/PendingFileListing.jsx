import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
// import Button from '@mui/material/Button';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { pullRequestStatusMap, pullRequestStatusColorMap } from '@/utils/bureaumappings';

function PendingFilesListing({ recentFiles, navigateFiles }) {
	return (
		<Card type="none">
			<Stack direction="column" alignItems="flex-start">
				<Typography variant="h5" textTransform="uppercase" m={2}>
					Pending Files
				</Typography>
				<PendingFilesTable recentFiles={recentFiles} />
				{/* {recentFiles && recentFiles.length > 0 && (
					<Button
						size="small"
						startIcon={<KeyboardArrowDownIcon />}
						sx={{
							m: 1,
						}}
						onClick={() => navigateFiles()}
					>
						View All
					</Button>
				)} */}
			</Stack>
		</Card>
	);
}

function PendingFilesTable({ recentFiles }) {
	return (
		<TableContainer>
			<Table aria-label="pending files table" size="medium">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell align="left">File Name</TableCell>
						<TableCell align="left">Bureau Name</TableCell>
						<TableCell align="center">Pending Cards</TableCell>
						<TableCell align="left">Updated By</TableCell>
						<TableCell align="left">Date & Time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{recentFiles.length === 0 && (
						<TableRow hover>
							<TableCell colSpan={5}>
								<Typography
									variant="body3"
									component="span"
									sx={{
										height: '50px',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									No pending files
								</Typography>
							</TableCell>
						</TableRow>
					)}
					{recentFiles.map((pull) => (
						<PendingFilesRow key={pull.id} pull={pull} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function PendingFilesRow({ pull }) {
	const { id, name, bureauName, pendingCardsCount, updatedBy, createdAt } = pull;
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
					{name}
				</Link>
			</TableCell>
			<TableCell align="left" size="small">
				<Typography variant="body1" color="text.tertiary">
					{bureauName}
				</Typography>
				{/* <Chip label={pullRequestStatusMap[status]} size="small" color={pullRequestStatusColorMap[status]} /> */}
			</TableCell>
			<TableCell align="center" size="small">
				<Typography variant="body1" color="text.tertiary">
					{pendingCardsCount}
				</Typography>
			</TableCell>
			<TableCell align="left" size="small">
				<Typography variant="body1" color="text.tertiary">
					{updatedBy}
				</Typography>
			</TableCell>
			<TableCell align="left" size="small">
				<Typography variant="body1" color="text.tertiary">
					{createdAt}
				</Typography>
			</TableCell>
		</TableRow>
	);
}

export default PendingFilesListing;
