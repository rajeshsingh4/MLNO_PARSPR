import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/InventoryOutlined';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import xlsxParser from 'xls-parser';
import PageHeader from '@/components/pageHeader';
import FlieMasterListService from '@/utils/services/files.services';

export default function FileUpload() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileData, setFileData] = useState({
		file: null,
		cards: [],
	});

	const handleFileSelect = (e) => {
		const { files } = e.target;
		const file = files[0];
		xlsxParser
			.onFileSelection(file)
			.then((data) => {
				setFileData({
					file: {
						name: file.name,
						details: JSON.stringify(file),
						dataProcessor: 'xml-parser',
						bureauName: 'Bureau 1',
						cutOffTime: new Date(),
					},
					cards: data.Sheet1,
				});
			})
			.catch((err) => {
				console.log(err);
				setFileData({
					file: null,
					cards: [],
				});
			});
		setSelectedFile(file);
	};

	const resetFile = () => {
		setSelectedFile(null);
		setFileData({
			file: null,
			cards: [],
		});
	};

	const handleFileUpload = async () => {
		if (!selectedFile || !fileData || !fileData.file) {
			return false;
		}
		let isError = false;
		let message = '';
		try {
			const fileUploadResponse = await FlieMasterListService.uploadMasterFiles(fileData);
			console.log(fileUploadResponse);
			if (fileUploadResponse) {
				message = 'Successfully uploaded file';
			} else {
				isError = true;
				message = 'Could not upload the file!';
			}
		} catch (err) {
			isError = true;
			message = 'Could not upload the file!';
			console.error('Error uploading file', err);
		}
		return true;
	};

	const getColumnMapping = (row) => {
		const fieldList = [];
		const listKey = Object.keys(row);

		listKey.forEach((key) => {
			const basicColumnFields = {
				field: key,
				headerName: key.split('_').join(' '),
				description: key.split('_').join(' '), // shows as tooltip
				hideable: true, // user can show hide the column
				sortable: true,
				width: 200,
				editable: false,
			};
			if (key === 'id') {
				basicColumnFields.headerName = 'S. No.';
				basicColumnFields.description = 'S. No.';
				basicColumnFields.width = 80;
				basicColumnFields.hideable = false;
			}
			fieldList.push(basicColumnFields);
		});
		return fieldList;
	};

	return (
		<>
			<PageHeader title="File Upload">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card component="section" type="section">
					{!selectedFile && (
						<CardContent
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: '1px dashed black',
								height: '20rem',
							}}
						>
							{!selectedFile && (
								<label htmlFor="file-upload-by-bank">
									<Button variant="raised" component="span">
										<AddIcon />
									</Button>
									<input
										accept=".csv,.xml"
										style={{ display: 'none' }}
										id="file-upload-by-bank"
										type="file"
										onChange={(e) => handleFileSelect(e)}
									/>
								</label>
							)}
						</CardContent>
					)}
					{selectedFile && fileData && fileData.cards.length > 0 && (
						<DataGrid
							className="mui-data-grid file-master"
							rows={fileData.cards}
							columns={getColumnMapping(fileData.cards[0])}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 10 },
								},
							}}
							pageSizeOptions={[10, 20, 50, 100, 300, 500, 1000]}
						/>
					)}
					<CardActions>
						{selectedFile && (
							<Grid container spacing={3} justifyContent="space-between">
								<Grid item>
									<Button onClick={resetFile}>Reset</Button>
								</Grid>
								<Grid item>
									<Button onClick={handleFileUpload}>Upload File</Button>
								</Grid>
							</Grid>
						)}
					</CardActions>
				</Card>
			</Container>
		</>
	);
}
