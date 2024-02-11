import * as React from 'react';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import PageHeader from '@/components/pageHeader';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Loader from '@/components/loader';
import FileMasterListService from '@/utils/services/files.services';
import FileTATReportCardDetails from './FileTATReportCardDetails';

export default function FileTATReport() {
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
			console.error('Error fetching list of activity logs ', err);
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
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (fileTatError) {
		return <>Error Loading Report, Please try again!!</>;
	}

	const showTATDetailsReport = (type, fileId, cardData) => {
		setTATCardDetails({ type, fileId, cardData });
	};

	const hideTATDetailsReport = () => {
		setTATCardDetails(null);
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
			'id',
			'BureauName',
			'CutOffTime',
			'FileUploadTime',
			'cards',
			'createdBy',
			'modifiedBy',
			'createdAt',
			'updatedAt',
			'userId',
			'FileAttribute',
			'bureauoutsidetat_list',
			'bureauoutsidetat_listData',
			'bureauoutwip_list',
			'bureauwithintat_listData',
			'courieroutsidetat_list',
			'courieroutsidetat_listData',
			'courierwithintat_listData',
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
					labelHeader = 'Total Records';
					break;
				default:
					break;
			}
			return labelHeader;
		};

		records.sort(sorter);
		listKey.forEach((key, i) => {
			const baseFieldObj = {
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
			} else if (listKey[i] === 'bureauwithintat') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) => (
					<Button
						variant="contained"
						color="warning"
						onClick={() =>
							showTATDetailsReport('bureauwithintat', records[tableMeta.rowIndex].id, records[tableMeta.rowIndex].bureauwithintat_listData)
						}
						disableElevation
						size="small"
						style={{ marginLeft: 16 }}
					>
						{records[tableMeta.rowIndex].bureauwithintat}
					</Button>
				);
			} else if (listKey[i] === 'bureauWIP') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) => (
					<Button
						variant="contained"
						color="success"
						onClick={() =>
							showTATDetailsReport('bureauWIP', records[tableMeta.rowIndex].id, records[tableMeta.rowIndex].bureauwithintat_listData)
						}
						disableElevation
						size="small"
						style={{ marginLeft: 16 }}
					>
						{records[tableMeta.rowIndex].bureauWIP}
					</Button>
				);
			} else if (listKey[i] === 'bureauoutsidetat') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) => (
					<Button
						variant="contained"
						onClick={() =>
							showTATDetailsReport(
								'bureauoutsidetat',
								records[tableMeta.rowIndex].id,
								records[tableMeta.rowIndex].bureauoutsidetat_listData,
							)
						}
						disableElevation
						size="small"
						style={{ marginLeft: 16 }}
					>
						{records[tableMeta.rowIndex].bureauoutsidetat}
					</Button>
				);
			} else if (listKey[i] === 'courierwithintat') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) => (
					<Button
						variant="contained"
						onClick={() =>
							showTATDetailsReport(
								'courierwithintat',
								records[tableMeta.rowIndex].id,
								records[tableMeta.rowIndex].courierwithintat_listData,
							)
						}
						disableElevation
						size="small"
						style={{ marginLeft: 16 }}
					>
						{records[tableMeta.rowIndex].courierwithintat}
					</Button>
				);
			} else if (listKey[i] === 'courieroutsidetat') {
				baseFieldObj.options.customBodyRender = (value, tableMeta) => (
					<Button
						variant="contained"
						onClick={() =>
							showTATDetailsReport(
								'courieroutsidetat',
								records[tableMeta.rowIndex].id,
								records[tableMeta.rowIndex].courieroutsidetat_listData,
							)
						}
						disableElevation
						size="small"
						style={{ marginLeft: 16 }}
					>
						{records[tableMeta.rowIndex].courieroutsidetat}
					</Button>
				);
			}
			columns.push(baseFieldObj);
		});
		return columns;
	};

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
	};

	return (
		<>
			<PageHeader title="File tat report">
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
					<Typography color="text.tertiary">File tat report</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card component="section" type="section">
					<MUIDataTable
						className="mui-data-table file-tat-report"
						// title="Track Cards"
						data={fileTatReport}
						columns={getColumnMapping(fileTatReport)}
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
			<Modal
				id="edit-track-card-item"
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
						padding: '24px',
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ display: 'flex', justifyContent: 'space-between' }}
					>
						{getModalName()} Details
						<IconButton id="close-edit-item" onClick={hideTATDetailsReport}>
							<ClearIcon />
						</IconButton>
					</Typography>
					<Box component="form" id="card-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
						<FileTATReportCardDetails details={tatCardDetails} />
					</Box>
				</Box>
			</Modal>
		</>
	);
}
