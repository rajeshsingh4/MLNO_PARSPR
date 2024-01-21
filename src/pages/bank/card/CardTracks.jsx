import { useEffect, useState } from 'react';
// import { withStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import MUIDataTable from 'mui-datatables';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Loader from '@/components/loader';
import CardActivity from './CardActivity';
import CardTrackingService from '@/utils/services/card.service';

function CardTracks() {
	const navigate = useNavigate();
	const location = useLocation();
	const { state: fileDetails } = location;
	const [results, setResults] = useState([]);
	const [resultsLoader, setResultsLoader] = useState(false);
	const [resultsError, setResultsError] = useState(false);
	const [formData, setFormData] = useState(null);
	const [card, setCard] = useState(null);
	const [modal, setModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [drawer, setDrawer] = useState(false);

	const fieldNameMapping = { id: 'trackingId', Field_1: 'TestRajesh', Field_2: 'Pankajfld' };

	const loadContentFromServer = () => {
		setResultsLoader(true);
		CardTrackingService.getCardTrackingList(fileDetails.id)
			.then((response) => {
				setResults(response.data);
			})
			.catch(() => {
				setResultsError(true);
			})
			.finally(() => {
				setResultsLoader(false);
			});
	};

	useEffect(() => {
		loadContentFromServer();
	}, []);

	if (resultsLoader) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (resultsError) {
		return <>Error Loading cards</>;
	}

	const updateFormData = (e) => {
		const { name } = e.target;
		const { value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const createFormElement = () => {
		const hiddenElements = [
			'id',
			'createdAt',
			'updatedAt',
			'fileMaster',
			'userId',
			'createdBy',
			'modifiedBy',
			'fileMasterId',
		];
		const listElements = Object.keys(formData);
		const formElements = [];

		listElements.forEach((key, i) => {
			const basicAttributesOfElement = {
				id: `${key}_${i}_edit_item`,
				name: key,
				label: key,
				placeholder: key,
				value: formData[key] || undefined,
				onChange: (e) => updateFormData(e),
				type: typeof formData[key] === 'number' ? 'number' : 'text',
				'aria-label': key,
				fullWidth: true,
				size: 'medium',
			};
			if (!hiddenElements.includes(key)) {
				formElements.push(
					<Grid key={i} xs={12} sm={6} md={4}>
						<TextField {...basicAttributesOfElement} />
					</Grid>,
				);
			}
		});
		return formElements;
	};

	const handleEdit = (row) => {
		setCard(row.id);
		setFormData({ ...row });
		setModal(true);
		setEdit(true);
	};

	const handleClose = () => {
		setCard(null);
		setEdit(false);
		setModal(false);
		setFormData(null);
	};

	const toggleDrawer = (id, open) => {
		setCard(id);
		setDrawer(open);
	};

	const getColumnMapping = (row) => {
		const fieldList = [];
		if (!row || row.length === 0) {
			return fieldList;
		}
		const listKey = Object.keys(row);

		const fieldToShow = [
			'trackingId',
			'Bank',
			'AWB_No',
			'Product',
			'Logo',
			'PA_Flag',
			'NRWC_Flag',
			'Bureau_Total_TAT_Days',
			'Bureau_TAT_Extra_Days_Passed',
			'Bureau_Status',
			'Courier_Status',
			'Courier_TAT_Extra_Days_Passed',
		];

		listKey.forEach((key, i) => {
			let baseFieldObj = {
				name: listKey[i],
				options: { filter: true, viewColumns: true, display: !!fieldToShow.includes(listKey[i]) },
			};
			if (fieldNameMapping.hasOwnProperty(key)) {
				baseFieldObj.label = fieldNameMapping[key];
			}
			if (listKey[i] === 'id') {
				baseFieldObj.options.customBodyRender = (value) => (
					<Button variant="text" onClick={() => toggleDrawer(value, true)}>
						{value}
					</Button>
				);
			}
			fieldList.push(baseFieldObj);
			if (i === listKey.length - 1) {
				baseFieldObj = {
					name: 'Actions',
					label: 'Actions',
					options: {
						filter: false,
						sort: false,
						viewColumns: false,
						customBodyRender: (value, tableMeta, updateValue) => (
							<>
								<IconButton
									aria-label="edit"
									value={value}
									data-custom={{ tableMeta, updateValue }}
									row={row}
									onClick={() => handleEdit(row, tableMeta)}
								>
									<EditIcon />
								</IconButton>
								{/* <IconButton aria-label="delete" value={value} data-custom={{tableMeta, updateValue}} row={row} onClick={() => console.log('delete handler')}>
								<DeleteIcon />
							</IconButton> */}
							</>
						),
					},
				};
				fieldList.push(baseFieldObj);
			}
		});
		return fieldList;
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		CardTrackingService.updateCardTrackingList(formData.id, formData).then(() => {
			handleClose();
			loadContentFromServer();
		});
	};

	const goBackToFiles = () => {
		navigate(-1);
	};

	const options = {
		filter: true,
		fixedHeader: true,
		filterType: 'dropdown',
		responsive: 'standard',
		print: false,
		selectableRows: 'none',
		rowsPerPage: 10,
		rowsPerPageOptions: [10, 20, 50, 100],
	};

	return (
		<div>
			<Box>
				<div>
					<Button sx={{ mb: 2, mt: 2 }} variant="outlined" onClick={goBackToFiles}>
						Go Back
					</Button>
				</div>
				<MUIDataTable
					className="mui-data-table card-track"
					title="Track Cards"
					data={results}
					columns={getColumnMapping(results[0])}
					options={options}
				/>
			</Box>
			<Drawer anchor="right" open={drawer} onClose={() => toggleDrawer(null, false)}>
				<Box>
					<CardActivity toggleDrawer={toggleDrawer} id={card} />
				</Box>
			</Drawer>
			<Dialog
				id="edit-track-card-item"
				aria-labelledby="track-card-item"
				aria-describedby="track-card-item-description"
				open={modal}
				onClose={handleClose}
				maxWidth="md"
				sx={{ '& > div[aria-labelledby="track-card-item"]': { overflow: 'hidden' } }}
			>
				<DialogTitle>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="span"
						sx={{ display: 'flex', justifyContent: 'space-between' }}
					>
						Edit {edit && formData && formData.Product}
						<IconButton id="close-edit-item" onClick={handleClose}>
							<ClearIcon />
						</IconButton>
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Box>
						<Box
							component="form"
							id="card-form-container"
							noValidate
							autoComplete="off"
							sx={{ mt: 2, mb: 1 }}
						>
							<Grid container spacing={3} id="card-form-element-container">
								{edit && formData && createFormElement()}
							</Grid>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Grid container justifyContent="end">
						<Button
							type="submit"
							id="card-form-close-button"
							onClick={handleClose}
							variant="outlined"
							sx={{ mr: 1 }}
						>
							Close
						</Button>
						<Button
							type="submit"
							id="card-form-submit-button"
							onClick={(e) => handleUpdate(e)}
							variant="contained"
						>
							Update
						</Button>
					</Grid>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CardTracks;
