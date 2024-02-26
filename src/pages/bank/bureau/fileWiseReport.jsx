import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import FileMasterListService from '@/utils/services/files.services';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/pageHeader';

function FileWiseReport() {
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
			console.error('Error fetching list of files ', err);
			setFileListError(true);
		} finally {
			setFileListLoader(false);
		}
	};

	React.useEffect(() => {
		getFileList();
	}, []);

	if (fileListLoader) {
		return <div>Loading......</div>;
	}

	if (fileListError) {
		return <>Error Loading Files, Please try again!!</>;
	}

	const viewFileDetails = (fileId, cardData) => {
		navigate(`/bank/bureau/filewisereport/${fileId}`, { state: cardData });
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
			'cards',
			'userId',
			'createdBy',
			'modifiedBy',
			'createdAt',
			'updatedAt',
			'FileAttribute',
			'courieroutsidetat_list',
			'courieroutsidetat_listData',
			'courierwithintat_listData',
			'bureauoutsidetat_list',
			'bureauoutwip_list',
			'bureauoutsidetat_listData',
			'bureauwithintat_listData',
		];

		const getLabel = (label) => {
			let labelHeader = '';
			switch (label) {
				case 'id':
					labelHeader = 'S. No.';
					break;
				case 'fileName':
					labelHeader = 'File Name';
					break;
				case 'DataProcessor':
					labelHeader = 'Data Processor';
					break;
				case 'BureauName':
					labelHeader = 'Bureau Name';
					break;
				case 'CutOffTime':
					labelHeader = 'Actual Cut Off Time';
					break;
				case 'bureauwithintat':
					labelHeader = 'Bureau Within TAT';
					break;
				case 'bureauoutsidetat':
					labelHeader = 'Bureau Outside TAT';
					break;
				case 'bureauWIP':
					labelHeader = 'Bureau WIP';
					break;
				case 'courierwithintat':
					labelHeader = 'Courier Within TAT';
					break;
				case 'courieroutsidetat':
					labelHeader = 'Courier Outside TAT';
					break;
				case 'totalCards':
					labelHeader = 'Total Cards';
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
			if (listKey[i] === 'CutOffTime') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) =>
					new Date(records[tableMeta.rowIndex].CutOffTime).toLocaleString();
			} else if (listKey[i] === 'FileUploadTime') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) =>
					new Date(records[tableMeta.rowIndex].FileUploadTime).toLocaleString();
			}
			columns.push(baseFieldObj);
			if (i === listKey.length - 1) {
				baseFieldObj = {
					name: 'Action',
					label: 'Action',
					options: {
						filter: false,
						sort: false,
						viewColumns: false,
						// eslint-disable-next-line react/no-unstable-nested-components
						customBodyRenderLite: (rowIndex) => (
							<Button
								variant="contained"
								disableElevation
								onClick={() => viewFileDetails(records[rowIndex].id, records[rowIndex])}
							>
								View WIP
							</Button>
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
			<PageHeader title="File wise report">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
					<Typography color="text.tertiary">bureau</Typography>
					<Typography color="text.tertiary">File wise report</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card component="section" type="section">
					<MUIDataTable
						className="mui-data-table file-master-report"
						// title="Track Cards"
						data={fileList}
						columns={getColumnMapping(fileList)}
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
		</>
	);
}

export default FileWiseReport;
