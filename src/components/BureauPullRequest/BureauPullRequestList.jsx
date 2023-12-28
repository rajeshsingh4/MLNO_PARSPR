import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from "../../common/SkeletonLoader";
import PullRequestService from '../../services/pull-request.service';
import { actionListMap, modeLsitMap, pullRequestStatusColorMap, pullRequestStatusMap } from '../../common/constants';
import BureauPullRequestConfirmationDialog from './BureauPullRequestConfirmationDialog';

const BureauPullRequestList = (props) => {
    const [pullRequestLoader, setPullRequestLoader] = React.useState(false);
    const [pullRequestListError, setPullRequestListError] = React.useState(false);
    const [pullRequestList, setPullRequestList] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);

    const navigate = useNavigate();

    const getPullRequestList = async () => {
        setPullRequestLoader(true);
        try {
            const pullRequestResp = await PullRequestService.getPullRequest('bureau=BureauName_c');
            setPullRequestList(pullRequestResp.data);
        } catch (err) {
            console.error("Error fetching list of pull requests", err);
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
            <SkeletonLoader count={20} />
        )
    }

    if (pullRequestListError) {
        return <>Error Loading Pull Requests, Please try again!!</>
    }

    const viewRequestDetails = (pullId, cardData) => {
        navigate(`/bureau-pull-request/view/${pullId}`, { state: cardData });
    }

    const handleBureauAction = (pullId, cardData) => {
        setConfirmDialogOpen({
            pullId, cardData
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
        let columns = [];
        const hiddenColumns = ['changeCommunicatedTo', 'updatedAt', 'fileMasterId', 'createdBy', 'modifiedBy', 'cardId', 'ipaddress', 'serviceRequest', 'fileMaster'];
        const rowFieldKeys = Object.keys(row);
        rowFieldKeys.forEach(key => {
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
                basicColumnFields.valueGetter = (params) => (new Date(params.row.createdAt)).toLocaleString();
            }
            if (key === 'status') {
                basicColumnFields.headerName = 'Status';
                basicColumnFields.description = 'Status';
                basicColumnFields.renderCell = (params) => <Chip label={pullRequestStatusMap[params.row.status]} size='small' color={pullRequestStatusColorMap[params.row.status]} />
            }
            if (key === 'userId') {
                basicColumnFields.headerName = 'Actions';
                basicColumnFields.description = 'Actions';
                basicColumnFields.sortable = false;
                basicColumnFields.renderCell = (params) => <>
                    <IconButton
                        aria-label="more"
                        id={`${params.row.id}-icon`}
                        aria-controls={Boolean(anchorEl) ? `${params.row.id}-icon` : undefined}
                        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
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
                        <MenuItem onClick={() => viewRequestDetails(params.row.id, params.row)}>View Details</MenuItem>
                        <MenuItem onClick={() => handleBureauAction(params.row.id, params.row)}>Action</MenuItem>
                    </Menu>
                </>
            }
            if (!hiddenColumns.includes(key)) {
                columns.push(basicColumnFields);
            }
        });
        return columns;
    }

    return (
        <>
            <DataGrid
                className='mui-data-grid file-master'
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
            {
                confirmDialogOpen && (
                    <BureauPullRequestConfirmationDialog {...confirmDialogOpen} getPullRequestList={getPullRequestList} handleClose={handleCloseConfirmDialog} />
                )
            }
        </>
    );
}

export default BureauPullRequestList;