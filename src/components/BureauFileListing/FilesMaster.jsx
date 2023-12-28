import * as React from 'react';
import { DataGrid,gridClasses  } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SkeletonLoader from "../../common/SkeletonLoader";
import FileMasterListService from '../../services/files.services';
import { useNavigate } from "react-router-dom";


export const FilesMaster = () => {
    const [fileListLoader, setFileListLoader] = React.useState(false);
    const [fileListError, setFileListError] = React.useState(false);
    const [fileList, setFileList] = React.useState([]);
    const navigate = useNavigate();

    const getFileList = async () => {
        setFileListLoader(true);
        try {
            const fileMasterDetails = await FileMasterListService.getFileMasterList();
            setFileList(fileMasterDetails.data);
        } catch (err) {
            console.error("Error fetching list of files ", err);
            setFileListError(true);
        } finally {
            setFileListLoader(false);
        }
    };

    React.useEffect(() => {
        getFileList();
    }, []);

    if (fileListLoader) {
        return (
            <SkeletonLoader count={20} />
        )
    }

    if (fileListError) {
        return <>Error Loading Files, Please try again!!</>
    }

    const viewFileDetails = (fileId, cardData) => {
        navigate(`/files/${fileId}`, { state: cardData });
    }

    const getColumnMapping = (row) => {
        if (!row || (row && row.length === 0)) {
            return [];
        }
        let columns = [];
        const hiddenColumns = ['createdAt', 'updatedAt', 'FileAttribute'];
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
            if (key === 'CuffOffTime') {
                basicColumnFields.headerName = 'Cuff Off Time';
                basicColumnFields.description = 'Cuff Off Time';
                basicColumnFields.valueGetter = (params) => (new Date(params.row.CuffOffTime)).getTime();
            }
            if (key === 'FileUploadTime') {
                basicColumnFields.headerName = 'Actual File Upload Time';
                basicColumnFields.description = 'Actual File Upload Time';
                basicColumnFields.valueGetter = (params) => (new Date(params.row.FileUploadTime)).getTime();
            }
            if (key === 'cards') {
                basicColumnFields.headerName = 'Action';
                basicColumnFields.description = 'Action';
                basicColumnFields.sortable = false;
                basicColumnFields.renderCell = (params) => <Button variant="contained" disableElevation onClick={() => viewFileDetails(params.row.id, params.row)}>View Details</Button>
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
                loading={fileListLoader}
                rows={fileList}
                sx={{ typography: 'body2' }}
                columns={getColumnMapping(fileList[0])}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 50, 100]}
               
            />
        </>
    );
}
