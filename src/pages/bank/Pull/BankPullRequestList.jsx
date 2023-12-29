import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import Loader from '@/components/loader';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/pageHeader';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import PullRequestService from '@/utils/services/pull-request.service';
import { actionListMap, modeLsitMap, pullRequestStatusColorMap, pullRequestStatusMap } from '@/utils/bureaumappings';
import BankPullRequestConfirmationDialog from './BankPullRequestConfirmation';

function BankPullRequestList(props) {
	const [pullRequestLoader, setPullRequestLoader] = React.useState(false);
	const [pullRequestListError, setPullRequestListError] = React.useState(false);
	const [pullRequestList, setPullRequestList] = React.useState([]);
	const [anchorEl, setAnchorEl] = React.useState(null);
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

	const handleBureauAction = (pullId, cardData) => {
		setConfirmDialogOpen({
			pullId,
			cardData,
		});
		handleMenuClose();
	};

	const handleCloseConfirmDialog = () => {
		setConfirmDialogOpen(null);
	};

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const getColumnMapping = (row) => {
		if (!row || (row && row.length === 0)) {
			return [];
		}
		const columns = [];
		const hiddenColumns = ['updatedAt', 'fileMasterId', 'createdBy', 'modifiedBy', 'cardId'];
		const rowFieldKeys = Object.keys(row);
		rowFieldKeys.forEach((key) => {
			const basicColumnFields = {
				field: key,
				headerName: key,
				description: key, // shows as tooltip
				sortable: true,
				width: 200,
				editable: false,
			};
			if (key === 'id') {
				basicColumnFields.headerName = 'S. No.';
				basicColumnFields.description = 'S. No.';
				basicColumnFields.width = 80;
			}
			if (key === 'action') {
				basicColumnFields.headerName = 'Action Type';
				basicColumnFields.description = 'Action Type';
				basicColumnFields.valueGetter = (params) => actionListMap[params.row.action] || params.row.action;
			}
			if (key === 'changeCommunicatedTo') {
				basicColumnFields.headerName = 'Change Communicated To';
				basicColumnFields.description = 'Change Communicated To';
			}
			if (key === 'field') {
				basicColumnFields.headerName = 'Field';
				basicColumnFields.description = 'Field';
				basicColumnFields.valueGetter = (params) => params.row.field || '-';
			}
			if (key === 'originalValue') {
				basicColumnFields.headerName = 'Original Value';
				basicColumnFields.description = 'Original Value';
				basicColumnFields.valueGetter = (params) => params.row.originalValue || '-';
			}
			if (key === 'newValue') {
				basicColumnFields.headerName = 'New Value';
				basicColumnFields.description = 'New Value';
				basicColumnFields.valueGetter = (params) => params.row.newValue || '-';
			}
			if (key === 'mode') {
				basicColumnFields.headerName = 'Mode';
				basicColumnFields.description = 'Mode';
				basicColumnFields.valueGetter = (params) => modeLsitMap[params.row.mode] || params.row.mode;
			}
			if (key === 'ipaddress') {
				basicColumnFields.headerName = 'IP Address';
				basicColumnFields.description = 'IP Address';
			}
			if (key === 'serviceRequest') {
				basicColumnFields.headerName = 'Service Request';
				basicColumnFields.description = 'Service Request';
			}
			if (key === 'createdAt') {
				basicColumnFields.headerName = 'Date & Time';
				basicColumnFields.description = 'Date & Time';
				basicColumnFields.valueGetter = (params) => new Date(params.row.createdAt).toLocaleString();
			}
			if (key === 'status') {
				basicColumnFields.headerName = 'Status';
				basicColumnFields.description = 'Status';
				basicColumnFields.renderCell = (params) => (
					<Chip
						label={pullRequestStatusMap[params.row.status]}
						size="small"
						color={pullRequestStatusColorMap[params.row.status]}
					/>
				);
			}
			if (key === 'userId') {
				basicColumnFields.headerName = 'Action';
				basicColumnFields.description = 'Action';
				basicColumnFields.sortable = false;
				basicColumnFields.renderCell = (params) => (
					<>
						<IconButton
							aria-label="more"
							id={`${params.row.id}-icon`}
							aria-controls={anchorEl ? `${params.row.id}-icon` : undefined}
							aria-expanded={anchorEl ? 'true' : undefined}
							aria-haspopup="true"
							onClick={handleMenuOpen}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id={`${params.row.id}-menu`}
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
							MenuListProps={{
								'aria-labelledby': `${params.row.id}-icon`,
							}}
						>
							<MenuItem onClick={() => viewRequestDetails(params.row.id, params.row)}>
								View Details
							</MenuItem>
							<MenuItem onClick={() => handleBureauAction(params.row.id, params.row)}>Action</MenuItem>
						</Menu>
					</>
				);
			}
			if (!hiddenColumns.includes(key)) {
				columns.push(basicColumnFields);
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
					<Link underline="hover" href="/dashboards/dashboard1">
						Dashboard
					</Link>
					<Typography color="text.tertiary">Bank</Typography>
					<Typography color="text.tertiary">Pull Requests</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card component="section" type="section">
					<DataGrid
						className="mui-data-grid file-master"
						loading={pullRequestLoader}
						rows={pullRequestList}
						columns={getColumnMapping(pullRequestList[0])}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 10 },
							},
						}}
						pageSizeOptions={[10, 20, 50, 100]}
						// checkboxSelection
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
