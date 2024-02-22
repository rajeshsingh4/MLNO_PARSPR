import { useState } from 'react';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/InventoryOutlined';
import CardContent from '@mui/material/CardContent';
import PageHeader from '@/components/pageHeader';
import FlieMasterListService from '@/utils/services/files.services';
import CardActions from '@mui/material/CardActions';

export default function FileUpload() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileUploadDetails, setFileUploadDetails] = useState({
		progress: 0,
		message: '',
		isError: false,
	});

	const handleFileSelect = (e) => {
		const { files } = e.target;
		setSelectedFile(files[0]);
	};

	const onUploadProgress = (event) => {
		setFileUploadDetails({
			...fileUploadDetails,
			progress: Math.round((100 * event.loaded) / event.total),
		});
	};

	const handleFileUpload = async () => {
		if (!selectedFile) {
			return false;
		}
		let isError = false;
		let message = '';
		try {
			const formData = new FormData();
			formData.append('file', selectedFile);
			const fileUploadResponse = await FlieMasterListService.uploadMasterFiles(formData, onUploadProgress);
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
		} finally {
			setFileUploadDetails({
				...fileUploadDetails,
				message,
				isError,
			});
		}
		return true;
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
					<CardContent
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: '1px dashed black',
							height: '20rem',
						}}
					>
						<label htmlFor="file-upload-by-bank">
							<Button variant="raised" component="span">
								<AddIcon />
							</Button>
							<input
								accept=".csv,.xml"
								style={{ display: 'none' }}
								id="file-upload-by-bank"
								multiple
								type="file"
								onChange={(e) => handleFileSelect(e)}
							/>
						</label>
					</CardContent>
					<CardActions>{selectedFile && <Button onClick={handleFileUpload}>Upload File</Button>}</CardActions>
				</Card>
			</Container>
		</>
	);
}
