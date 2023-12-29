import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/pageHeader';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/loader';
import PullRequestService from '@/utils/services/pull-request.service';
import { actionListMap, modeLsitMap, pullRequestStatusColorMap, pullRequestStatusMap } from '@/utils/bureaumappings';
import BureauPullRequestConfirmationDialog from './BureauPullRequestConfirmationDialog';

function BureauPullRequestList(props) {
	const [pullRequestLoader, setPullRequestLoader] = React.useState(false);
	const [pullRequestListError, setPullRequestListError] = React.useState(false);
	const [pullRequestList, setPullRequestList] = React.useState([]);
	const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

	const navigate = useNavigate();

	const getPullRequestList = async () => {
		setPullRequestLoader(true);
		try {
			const pullRequestResp = await PullRequestService.getPullRequest('bureau=BureauName_c');
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
		navigate(`/bureau/pull/view/${pullId}`, { state: cardData });
	};

	const handleCloseConfirmDialog = () => {
		setConfirmDialogOpen(null);
	};

	const handleBureauAction = (pullId, cardData) => {
		setConfirmDialogOpen({
			pullId,
			cardData,
		});
	};

	const getColumnMapping = (row) => {
		if (!row || (row && row.length === 0)) {
			return [];
		}
		const columns = [];
		const hiddenColumns = [
			'changeCommunicatedTo',
			'updatedAt',
			'fileMasterId',
			'createdBy',
			'modifiedBy',
			'cardId',
			'ipaddress',
			'serviceRequest',
			'fileMaster',
		];
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
				basicColumnFields.headerName = 'Type';
				basicColumnFields.description = 'Type';
				basicColumnFields.valueGetter = (params) => actionListMap[params.row.action] || params.row.action;
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
				basicColumnFields.headerName = 'Actions';
				basicColumnFields.description = 'Actions';
				basicColumnFields.sortable = false;
				basicColumnFields.renderCell = (params) => (
					<>
						<IconButton
							aria-label="view"
							id={`${params.row.id}-view`}
							aria-controls={`${params.row.id}-view`}
							aria-expanded="true"
							aria-haspopup="true"
							onClick={() => viewRequestDetails(params.row.id, params.row)}
						>
							<VisibilityIcon />
						</IconButton>
						<IconButton
							aria-label="action"
							id={`${params.row.id}-action`}
							aria-controls={`${params.row.id}-action`}
							aria-expanded="true"
							aria-haspopup="true"
							onClick={() => handleBureauAction(params.row.id, params.row)}
						>
							<ModeEditIcon />
						</IconButton>
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
			<PageHeader title="Bureau Pull Requests">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/dashboards/dashboard1">
						Dashboard
					</Link>
					<Typography color="text.tertiary">Bureau</Typography>
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
				{confirmDialogOpen && (
					<BureauPullRequestConfirmationDialog
						{...confirmDialogOpen}
						getPullRequestList={getPullRequestList}
						handleClose={handleCloseConfirmDialog}
					/>
				)}
			</Container>
		</>
	);
}

export default BureauPullRequestList;
