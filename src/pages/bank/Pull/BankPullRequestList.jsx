import React from 'react';
import MUIDataTable from 'mui-datatables';
// import { DataGrid } from '@mui/x-data-grid';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import Loader from '@/components/loader';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/pageHeader';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import PullRequestService from '@/utils/services/pull-request.service';
import { actionListMap, modeLsitMap, pullRequestStatusColorMap, pullRequestStatusMap } from '@/utils/bureaumappings';
import BankPullRequestConfirmationDialog from './BankPullRequestConfirmation';

function BankPullRequestList() {
	const [pullRequestLoader, setPullRequestLoader] = React.useState(false);
	const [pullRequestListError, setPullRequestListError] = React.useState(false);
	const [pullRequestList, setPullRequestList] = React.useState([]);
	const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

	const navigate = useNavigate();

	const getPullRequestList = async () => {
		setPullRequestLoader(true);
		try {
			const pullRequestResp = await PullRequestService.getPullRequest();
			setPullRequestList(pullRequestResp.data);
		} catch (err) {
			console.error('Error fetching list of pull requests', err);
			setPullRequestListError(true);
		} finally {
			setPullRequestLoader(false);
		}
	};

	React.useEffect(() => {
		getPullRequestList();
	}, []);

	if (pullRequestLoader) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (pullRequestListError) {
		return <>Error Loading Pull Requests, Please try again!!</>;
	}

	const viewRequestDetails = (pullId, cardData) => {
		navigate(`/bank/pull/view/${pullId}`, { state: cardData });
	};

	const handleBankAction = (pullId, cardData) => {
		setConfirmDialogOpen({
			pullId,
			cardData,
		});
	};

	const handleCloseConfirmDialog = () => {
		setConfirmDialogOpen(null);
	};

	const sorter = (a, b) => {
		if (a.id > b.id) {
			return 1;
		}
		if (a.id < b.id) {
			return -1;
		}
		return 0;
	};

	const getColumnMapping = (records) => {
		const columns = [];
		if (!records || records.length === 0) {
			return columns;
		}
		const listKey = Object.keys(records[0]);

		const hiddenColumns = [
			'updatedAt',
			'fileMasterId',
			'createdBy',
			'modifiedBy',
			'cardId',
			'card',
			'user',
			'userId',
			'fileMaster',
		];

		const getLabel = (label) => {
			let labelHeader = '';
			switch (label) {
				case 'id':
					labelHeader = 'S. No.';
					break;
				case 'action':
					labelHeader = 'Action Type';
					break;
				case 'changeCommunicatedTo':
					labelHeader = 'Change Communicated To';
					break;
				case 'field':
					labelHeader = 'Field';
					break;
				case 'originalValue':
					labelHeader = 'Original Value';
					break;
				case 'newValue':
					labelHeader = 'New Value';
					break;
				case 'mode':
					labelHeader = 'Mode';
					break;
				case 'ipaddress':
					labelHeader = 'IP Address';
					break;
				case 'serviceRequest':
					labelHeader = 'Service Request';
					break;
				case 'createdAt':
					labelHeader = 'Date & Time';
					break;
				case 'status':
					labelHeader = 'Status';
					break;
				default:
					break;
			}
			return labelHeader;
		};

		records.sort(sorter);
		listKey.forEach((key, i) => {
			let baseFieldObj = {
				name: listKey[i],
				label: getLabel(listKey[i]),
				options: { filter: true, sort: true, viewColumns: true, display: !hiddenColumns.includes(listKey[i]) },
			};
			// show custom data
			if (listKey[i] === 'action') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) =>
					actionListMap[records[tableMeta.rowIndex].action];
			} else if (listKey[i] === 'mode') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) =>
					modeLsitMap[records[tableMeta.rowIndex].mode];
			} else if (listKey[i] === 'createdAt') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) =>
					new Date(records[tableMeta.rowIndex].createdAt).toLocaleString();
			} else if (listKey[i] === 'status') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) => (
					<Chip
						label={pullRequestStatusMap[records[tableMeta.rowIndex].status]}
						size="small"
						color={pullRequestStatusColorMap[records[tableMeta.rowIndex].status]}
					/>
				);
			}
			columns.push(baseFieldObj);
			if (i === listKey.length - 1) {
				baseFieldObj = {
					name: 'Actions',
					label: 'Actions',
					options: {
						filter: false,
						sort: false,
						viewColumns: false,
						// eslint-disable-next-line react/no-unstable-nested-components
						customBodyRenderLite: (rowIndex) => (
							<Grid container justifyContent="space-between">
								<IconButton
									aria-label="view"
									value={records[rowIndex].id}
									data-customview={records[rowIndex]}
									id={`${records[rowIndex].id}-view`}
									aria-controls={`${records[rowIndex].id}-view`}
									aria-expanded="false"
									aria-haspopup="false"
									onClick={() => viewRequestDetails(records[rowIndex].id, records[rowIndex])}
								>
									<VisibilityIcon />
								</IconButton>
								<IconButton
									aria-label="action"
									id={`${records[rowIndex].id}-action`}
									aria-controls={`${records[rowIndex].id}-action`}
									aria-expanded="false"
									aria-haspopup="false"
									onClick={() => handleBankAction(records[rowIndex].id, records[rowIndex])}
								>
									<ModeEditIcon />
								</IconButton>
							</Grid>
						),
					},
				};
				columns.push(baseFieldObj);
			}
		});
		return columns;
	};

	return (
		<>
			<PageHeader title="Bank Pull Requests">
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
					<Typography color="text.tertiary">Pull Requests</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card component="section" type="section">
					<MUIDataTable
						className="mui-data-table bank-pull-request-list"
						// title="Track Cards"
						data={pullRequestList}
						columns={getColumnMapping(pullRequestList)}
						options={{
							filter: true,
							fixedHeader: true,
							filterType: 'dropdown',
							responsive: 'standard',
							print: false,
							selectableRows: 'none',
							rowsPerPage: 10,
							rowsPerPageOptions: [10, 20, 50, 100],
						}}
					/>
				</Card>
			</Container>
			{confirmDialogOpen && (
				<BankPullRequestConfirmationDialog
					{...confirmDialogOpen}
					getPullRequestList={getPullRequestList}
					handleClose={handleCloseConfirmDialog}
				/>
			)}
		</>
	);
}

export default BankPullRequestList;
