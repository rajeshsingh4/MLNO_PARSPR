import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkeletonLoader from '../../common/SkeletonLoader';
import PullRequestService from '../../services/pull-request.service';
import PullRequestActivityTimeline from './PullRequestActivityTimeline';
import { pullRequestStatusColorMap, pullRequestStatusMap } from '../../common/constants';

const ViewPullRequestDetails = (props) => {
    const [pullRequestDetailsLoader, setPullRequestDetailsLoader] = React.useState(true);
    const [pullRequestDetailsError, setPullRequestDetailsError] = React.useState(false);
    const [pullRequestDetails, setPullRequestDetails] = React.useState({});
    const { id } = useParams();

    const getPullRequestListDetails = async () => {
        setPullRequestDetailsLoader(true);
        try {
            const pullRequestResp = await PullRequestService.getPullRequestById(id);
            setPullRequestDetails(pullRequestResp.data);
        } catch (err) {
            console.error("Error fetching pull request details ", err);
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
            <SkeletonLoader count={20} />
        )
    }

    if (pullRequestDetailsError) {
        return <>Error Loading Pull Requests Details, Please try again!!</>
    }

    const getHoursMinutesSeconds = (date) => {
        const tempDate = new Date(date);
        return `${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    }

    const getColumnMapping = (row) => {
        let fieldList = [];
        let listKey = Object.keys(row);

        let fieldToShow = ['id', 'Bank', 'AWB_No', 'Product', 'Logo', 'PA_Flag', 'NRWC_Flag', 'Bureau_Total_TAT_Days', 'Bureau_TAT_Extra_Days_Passed', 'Bureau_Status', 'Courier_Status', 'Courier_TAT_Extra_Days_Passed'];

        listKey.forEach(key => {
            const basicColumnFields = {
                field: key,
                headerName: key.split('_').join(' '),
                description: key.split('_').join(' '), // shows as tooltip
                sortable: true,
                width: 200,
                editable: false,
            };
            if (key === 'id') {
                basicColumnFields.headerName = 'S. No.';
                basicColumnFields.description = 'S. No.';
                basicColumnFields.width = 80;
            }
            if (fieldToShow.includes(key)) {
                fieldList.push(basicColumnFields);
            }
        });
        return fieldList;
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Pull Request ID</TableCell>
                            <TableCell>{pullRequestDetails.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>{new Date(pullRequestDetails.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>{getHoursMinutesSeconds(pullRequestDetails.createdAt)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Change Originator</TableCell>
                            <TableCell>{pullRequestDetails.userId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Change Communicated To</TableCell>
                            <TableCell>{pullRequestDetails.changeCommunicatedTo}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>{pullRequestDetails.action}</TableCell>
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
                            <TableCell>Mode of Communication</TableCell>
                            <TableCell>{pullRequestDetails.mode}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell><Chip size='small' label={pullRequestStatusMap[pullRequestDetails.status]} color={pullRequestStatusColorMap[pullRequestDetails.status]} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>IP Address</TableCell>
                            <TableCell>{pullRequestDetails.ipaddress}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Service Request ID</TableCell>
                            <TableCell>{pullRequestDetails.serviceRequest}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <DataGrid
                    className='mui-data-grid file-master'
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
            </TableContainer>
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Pull Request Activity Timeline</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Card elevation={0}>
                        <CardContent>
                            <PullRequestActivityTimeline {...pullRequestDetails} />
                        </CardContent>
                    </Card>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default ViewPullRequestDetails;