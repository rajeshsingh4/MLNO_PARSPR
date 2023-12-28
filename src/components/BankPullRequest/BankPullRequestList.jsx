import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from "../../common/SkeletonLoader";
import PullRequestService from '../../services/pull-request.service';
import { actionListMap, modeLsitMap, pullRequestStatusColorMap, pullRequestStatusMap } from '../../common/constants';

const BankPullRequestList = (props) => {
    const [pullRequestLoader, setPullRequestLoader] = React.useState(false);
    const [pullRequestListError, setPullRequestListError] = React.useState(false);
    const [pullRequestList, setPullRequestList] = React.useState([]);
    const navigate = useNavigate();

    const getPullRequestList = async () => {
        setPullRequestLoader(true);
        try {
            const pullRequestResp = await PullRequestService.getPullRequest();
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
        navigate(`/pull-request/view/${pullId}`, { state: cardData });
    }
    
    const getColumnMapping = (row) => {
        if (!row || (row && row.length === 0)) {
            return [];
        }
        let columns = [];
        const hiddenColumns = ['updatedAt', 'fileMasterId', 'createdBy', 'modifiedBy', 'cardId'];
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
                basicColumnFields.headerName = 'Action';
                basicColumnFields.description = 'Action';
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
                basicColumnFields.valueGetter = (params) => (new Date(params.row.createdAt)).toLocaleString();
            }
            if (key === 'status') {
                basicColumnFields.headerName = 'Status';
                basicColumnFields.description = 'Status';
                basicColumnFields.renderCell = (params) => <Chip label={pullRequestStatusMap[params.row.status]} size='small' color={pullRequestStatusColorMap[params.row.status]} />
            }
            if (key === 'userId') {
                basicColumnFields.headerName = 'View Details';
                basicColumnFields.description = 'View Details';
                basicColumnFields.sortable = false;
                basicColumnFields.renderCell = (params) => <Button variant="contained" disableElevation onClick={() => viewRequestDetails(params.row.id, params.row)}>View Details</Button>
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
        </>
    );
}

export default BankPullRequestList;