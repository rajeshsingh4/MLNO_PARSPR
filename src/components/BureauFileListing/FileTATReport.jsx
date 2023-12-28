import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import SkeletonLoader from "../../common/SkeletonLoader";
import FileMasterListService from '../../services/files.services';
import { FileTATReportCardDetails } from './FileTATReportCardDetails';
import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    palette: {
        anger: createColor('#F40B27'),
        apple: createColor('#5DBA40'),
        steelBlue: createColor('#5C76B7'),
        violet: createColor('#BC00A3'),
    },
});

export const FileTATReport = () => {
    const [fileTatLoader, setFileListLoader] = React.useState(false);
    const [fileTatError, setFileListError] = React.useState(false);
    const [fileTatReport, setFileList] = React.useState([]);
    const [tatCardDetails, setTATCardDetails] = React.useState(null);

    const getFileTATReports = async () => {
        setFileListLoader(true);
        try {
            const fileTATDetails = await FileMasterListService.getFileMasterList();
            // adding 5 temp columns - total cards count, bureau within tat, bureau outside tat, courier within tat, courier outside tat

            setFileList(fileTATDetails.data);
        } catch (err) {
            console.error("Error fetching list of activity logs ", err);
            setFileListError(true);
        } finally {
            setFileListLoader(false);
        }
    };

    React.useEffect(() => {
        getFileTATReports();
    }, []);

    if (fileTatLoader) {
        return (
            <SkeletonLoader count={20} />
        )
    }

    if (fileTatError) {
        return <>Error Loading Report, Please try again!!</>
    }

    const showTATDetailsReport = (type, fileId, cardData) => {
        setTATCardDetails({ type: type, fileId: fileId, cardData: cardData });
    }

    const hideTATDetailsReport = () => {
        setTATCardDetails(null);
    }

    const getColumnMapping = (row) => {
        if (!row || (row && row.length === 0)) {
            return [];
        }
        let columns = [];
        const hiddenColumns = ['id', 'BureauName', 'CutOffTime', 'FileUploadTime', 'cards', 'createdAt', 'updatedAt', 'FileAttribute'];
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
            if (key === 'fileName') {
                basicColumnFields.headerName = 'File Name';
                basicColumnFields.description = 'File Name';
            }
            if (key === 'totalCards') {
                basicColumnFields.headerName = 'Records';
                basicColumnFields.description = 'Records';
            }
            if (key === 'bureauwithintat') {
                basicColumnFields.headerName = 'Bureau within TAT';
                basicColumnFields.description = 'Bureau within TAT';
                basicColumnFields.renderCell = (params) => <Button variant="contained" color="apple" onClick={() => showTATDetailsReport('bureauwithintat', params.row.id, params.row['bureauwithintat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.bureauwithintat}</Button>
            }
            if (key === 'bureauWIP') {
                basicColumnFields.headerName = 'Bureau WIP';
                basicColumnFields.description = 'Bureau WIP';
                basicColumnFields.renderCell = (params) => <Button variant="contained" color="apple" onClick={() => showTATDetailsReport('bureauWIP', params.row.id, params.row['bureauwithintat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.bureauWIP}</Button>
            }
            if (key === 'bureauoutsidetat') {
                basicColumnFields.headerName = 'Bureau outside TAT';
                basicColumnFields.description = 'Bureau outside TAT';
                basicColumnFields.renderCell = (params) => <Button variant="contained" onClick={() => showTATDetailsReport('bureauoutsidetat', params.row.id, params.row['bureauoutsidetat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.bureauoutsidetat}</Button>
            }
            if (key === 'courierwithintat') {
                basicColumnFields.headerName = 'Courier within TAT';
                basicColumnFields.description = 'Courier within TAT';
                basicColumnFields.renderCell = (params) => <Button variant="contained" onClick={() => showTATDetailsReport('courierwithintat', params.row.id, params.row['courierwithintat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.courierwithintat}</Button>
            }
            if (key === 'courieroutsidetat') {
                basicColumnFields.headerName = 'Courier outside TAT';
                basicColumnFields.description = 'Courier outside TAT';
                basicColumnFields.renderCell = (params) => <Button variant="contained" onClick={() => showTATDetailsReport('courieroutsidetat', params.row.id, params.row['courieroutsidetat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.courieroutsidetat}</Button>
            }
            // if (key === 'cards') {
            //     basicColumnFields.headerName = 'Action';
            //     basicColumnFields.description = 'Action';
            //     basicColumnFields.sortable = false;
            //     basicColumnFields.renderCell = (params) => <Button variant="contained" disableElevation onClick={() => viewFileDetails(params.row.id, params.row)}>View Details</Button>
            // }
            if (!hiddenColumns.includes(key)) {
                columns.push(basicColumnFields);
            }
        });
        return columns;
    }

    const getModalName = () => {
        if (!tatCardDetails) {
            return '';
        }
        let modalName = 'Bureau within TAT';
        if (tatCardDetails.type === 'bureauoutsidetat') {
            modalName = 'Bureau outside TAT';
        } else if (tatCardDetails.type === 'courierwithintat') {
            modalName = 'Courier within TAT';
        } else if (tatCardDetails.type === 'courieroutsidetat') {
            modalName = 'Courier outside TAT';
        }
        return modalName;
    }

    return (
        <div style={{ width: '96vw' }}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    className='mui-data-grid file-master'
                    loading={fileTatLoader}
                    rows={fileTatReport}
                    columns={getColumnMapping(fileTatReport[0])}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    // checkboxSelection
                />
                <Modal
                    id='edit-track-card-item'
                    aria-labelledby="track-card-item"
                    aria-describedby="track-card-item-description"
                    open={tatCardDetails !== null}
                    onClose={hideTATDetailsReport}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'calc(80vw)',
                            height: '80vh',
                            backgroundColor: '#FFFFFF',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            fontWeight: 500,
                            textAlign: 'start',
                            padding: '24px'
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {getModalName()} Details
                            <IconButton id='close-edit-item' onClick={hideTATDetailsReport}><ClearIcon /></IconButton>
                        </Typography>
                        <Box component="form" id="card-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
                            <FileTATReportCardDetails details={tatCardDetails} />
                        </Box>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>
    );
}
