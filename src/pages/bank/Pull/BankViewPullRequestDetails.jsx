import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import CardHeader from '@/components/cardHeader';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from '@/components/loader';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import PageHeader from '@/components/pageHeader';
import PullRequestService from '@/utils/services/pull-request.service';
import PullRequestActivityTimeline from './PullRequestActivityTimeline';
import { pullRequestStatusColorMap, pullRequestStatusMap } from '@/utils/bureaumappings';
import CreatePullRequestForm from '@/pages/bank/Pull/CreatePullRequestForm';

function ViewPullRequestDetails(props) {
	const [pullRequestDetailsLoader, setPullRequestDetailsLoader] = React.useState(true);
	const [pullRequestDetailsError, setPullRequestDetailsError] = React.useState(false);
	const [pullRequestDetails, setPullRequestDetails] = React.useState({});
	const [pullRequestModal, setPullRequestModal] = React.useState({
		open: false,
		rowData: null,
		tableMeta: null,
		isEdit: false,
	});
	const { id } = useParams();

	const getPullRequestListDetails = async () => {
		setPullRequestDetailsLoader(true);
		try {
			const pullRequestResp = await PullRequestService.getPullRequestById(id);
			setPullRequestDetails(pullRequestResp.data);
		} catch (err) {
			console.error('Error fetching pull request details ', err);
			setPullRequestDetailsError(true);
		} finally {
			setPullRequestDetailsLoader(false);
		}
	};

	React.useEffect(() => {
		getPullRequestListDetails();
	}, []);

	if (pullRequestDetailsLoader) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (pullRequestDetailsError) {
		return <>Error Loading Pull Requests Details, Please try again!!</>;
	}

	const editPullRequestHandler = () => {
		const modalData = {
			open: true,
			rowData: Object.values(pullRequestDetails.card),
			tableMeta: { rowIndex: 0, tableData: [pullRequestDetails.card], pullRequestDetails },
			isEdit: true,
		};
		setPullRequestModal(modalData);
	};

	const handleClosePullModal = () => {
		setPullRequestModal({ open: false, rowData: null, tableMeta: null, isEdit: false });
	};

	const getHoursMinutesSeconds = (date) => {
		const tempDate = new Date(date);
		return `${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
	};

	const getColumnMapping = (row) => {
		const fieldList = [];
		const listKey = Object.keys(row);

		const fieldToShow = [
			'id',
			'Bank',
			'AWB_No',
			'Product',
			'Logo',
			'PA_Flag',
			'NRWC_Flag',
			'Bureau_Total_TAT_Days',
			'Bureau_TAT_Extra_Days_Passed',
			'Bureau_Status',
			'Courier_Status',
			'Courier_TAT_Extra_Days_Passed',
		];

		listKey.forEach((key) => {
			const basicColumnFields = {
				field: key,
				headerName: key.split('_').join(' '),
				description: key.split('_').join(' '), // shows as tooltip
				hideable: true, // user can show hide the column
				sortable: true,
				width: 200,
				editable: false,
			};
			if (key === 'id') {
				basicColumnFields.headerName = 'S. No.';
				basicColumnFields.description = 'S. No.';
				basicColumnFields.width = 80;
				basicColumnFields.hideable = false;
			}
			if (fieldToShow.includes(key)) {
				fieldList.push(basicColumnFields);
			}
		});
		return fieldList;
	};

	return (
		<>
			<PageHeader title="Pull Request Detail">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
					<Typography color="text.tertiary">Bank</Typography>
					<Typography color="text.tertiary">{id}</Typography>
				</Breadcrumbs>
			</PageHeader>

			<Container>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6} md={6}>
						<Card>
							<CardHeader title="Pull Detail" size="small" />
							<TableContainer>
								<Table>
									<TableBody>
										<TableRow>
											<TableCell>Pull Request ID</TableCell>
											<TableCell>{pullRequestDetails.id}</TableCell>
											<TableCell>
												<Button
													variant="contained"
													startIcon={<UpgradeIcon />}
													onClick={editPullRequestHandler}
												>
													Edit
												</Button>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Date</TableCell>
											<TableCell>
												{new Date(pullRequestDetails.createdAt).toLocaleDateString()}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Time</TableCell>
											<TableCell>
												{getHoursMinutesSeconds(pullRequestDetails.createdAt)}
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Field</TableCell>
											<TableCell>{pullRequestDetails.field}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>Original Value</TableCell>
											<TableCell>{pullRequestDetails.originalValue}</TableCell>
										</TableRow>

										<TableRow>
											<TableCell>New Value</TableCell>
											<TableCell>{pullRequestDetails.newValue}</TableCell>
										</TableRow>

										<TableRow>
											<TableCell>Action</TableCell>
											<TableCell>{pullRequestDetails.action}</TableCell>
										</TableRow>

										<TableRow>
											<TableCell>Status</TableCell>
											<TableCell>
												<Chip
													size="small"
													label={pullRequestStatusMap[pullRequestDetails.status]}
													color={pullRequestStatusColorMap[pullRequestDetails.status]}
												/>
											</TableCell>
										</TableRow>
										<TableRow />
										<TableRow>
											<TableCell>Service ID</TableCell>
											<TableCell>{pullRequestDetails.serviceRequest}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Stack spacing={3} direction="column">
							<Card>
								<CardHeader title="Action" size="small" />
							</Card>

							<Card>
								<CardHeader title="Pull  Created By" size="small" />
								<TableContainer>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>Change Originator</TableCell>
												<TableCell>{pullRequestDetails.userId}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>IP Address</TableCell>
												<TableCell>{pullRequestDetails.ipaddress}</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Requested By</TableCell>
												<TableCell>{pullRequestDetails.changeCommunicatedTo}</TableCell>
											</TableRow>

											<TableRow>
												<TableCell>Communicated Via</TableCell>
												<TableCell>{pullRequestDetails.mode}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Card>
						</Stack>
					</Grid>
				</Grid>
				<Grid container spacing={1} sx={{ mt: 2 }}>
					<Grid item xs={12}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Action Timeline</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Card>
									<PullRequestActivityTimeline {...pullRequestDetails} />
								</Card>
							</AccordionDetails>
						</Accordion>
					</Grid>
					<Grid item xs={12}>
						<Accordion sx={{ mt: 2 }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>Card Details</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<DataGrid
									className="mui-data-grid file-master"
									loading={pullRequestDetailsLoader}
									rows={[pullRequestDetails.card]}
									columns={getColumnMapping(pullRequestDetails.card)}
									initialState={{
										pagination: {
											paginationModel: { page: 0, pageSize: 10 },
										},
									}}
									pageSizeOptions={[10, 20, 50, 100]}
									// checkboxSelection
								/>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
			</Container>
			{pullRequestModal.open && pullRequestModal.rowData && (
				<CreatePullRequestForm
					handleClose={handleClosePullModal}
					pullRequestModal={pullRequestModal}
					goBackTo="/bank/pull/list"
				/>
			)}
		</>
	);
}

export default ViewPullRequestDetails;
