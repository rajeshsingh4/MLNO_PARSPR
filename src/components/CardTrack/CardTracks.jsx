import React from 'react';
import { withStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import MUIDataTable from "mui-datatables";
import CardTrackingService from '../../services/card.service';
import CardActivity from './CardActivity';

const styles = () => ({
	root: {
		flexGrow: 1,
	},
	modalContent: {
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
	},
	linkItem: {
		cursor: 'pointer',
		width: '100%'
	}
});

class CardTracks extends React.Component {

	constructor(props) {
		super(props);
		this.state = { results: props.fileDetails.cards, openModal: false, edit: false, formData: null, openDrawer: false, cardId: null };
		this.array = [];
		this.fieldNameMapping = { id: 'trackingId', Field_1: 'TestRajesh', Field_2: 'Pankajfld' };
	}

	loadContentFromServer() {
		CardTrackingService.getCardTrackingList(this.props.fileDetails.id)
			.then(response => {
				this.setState({ results: response.data.cards });
			});
	}

	updateFormData = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const formData = this.state.formData;
		this.setState({
			...this.state,
			formData: {
				...formData,
				[name]: value
			}
		});
	}

	createFormElement = () => {
		let hiddenElements = ['id', 'createdAt', 'updatedAt'];
		const formData = this.state.formData;
		let listElements = Object.keys(formData);
		let formElements = [];

		listElements.forEach((key, i) => {
			let basicAttributesOfElement = {
				id: `${key}_${i}_edit_item`,
				name: key,
				label: key,
				placeholder: key,
				value: formData[key],
				onChange: (e) => this.updateFormData(e),
				type: typeof formData[key] === 'number' ? 'number' : 'text',
				'aria-label': key,
				fullWidth: true,
				size: 'medium'
			}
			if (!hiddenElements.includes(key)) {
				formElements.push(
					<Grid key={i} xs={12} sm={6} md={4}>
						<TextField
							{...basicAttributesOfElement}
						/>
					</Grid>
				);
			}
		})
		return formElements;
	}

	handleEdit = (row, tableMeta) => {
		this.setState({
			cardId: row.id,
			openModal: true,
			edit: true,
			formData: { ...row }
		})
	}

	getColumnMapping = (row) => {
		let fieldList = [];
		let listKey = Object.keys(row);

		let fieldToShow = ['trackingId','Bank','AWB_No','Product','Logo','PA_Flag','NRWC_Flag','Bureau_Total_TAT_Days','Bureau_TAT_Extra_Days_Passed','Bureau_Status','Courier_Status','Courier_TAT_Extra_Days_Passed']

		listKey.forEach((key, i) => {
			let baseFieldObj = { name: listKey[i], options: { filter: true, viewColumns: true, display: (fieldToShow.includes(listKey[i]) ? true : false) } };
			if (this.fieldNameMapping.hasOwnProperty(key)) {
				baseFieldObj.label = this.fieldNameMapping[key];
			}
			if (listKey[i] === 'id') {
				baseFieldObj.options.customBodyRender = (value, tableMeta, updateValue) => (
					<Button className={this.props.classes.linkItem} variant="text" onClick={() => this.toggleDrawer(value, true)}>{value}</Button>
				)
			}
			fieldList.push(baseFieldObj);
			if (i === (listKey.length - 1)) {
				baseFieldObj = {
					name: 'Actions', label: 'Actions', options: {
						filter: false,
						sort: false,
						viewColumns: false,
						customBodyRender: (value, tableMeta, updateValue) => (
							<>
								<IconButton aria-label="edit" value={value} data-custom={{ tableMeta, updateValue }} row={row} onClick={() => this.handleEdit(row, tableMeta)}>
									<EditIcon />
								</IconButton>
								{/* <IconButton aria-label="delete" value={value} data-custom={{tableMeta, updateValue}} row={row} onClick={() => console.log('delete handler')}>
								<DeleteIcon />
							</IconButton> */}
							</>
						)
					}
				};
				fieldList.push(baseFieldObj);
			}
		})
		return fieldList;
	}

	handleUpdate = (e) => {
		e.preventDefault();
		CardTrackingService.updateCardTrackingList(this.state.formData.id, this.state.formData).then(resp => {
			this.handleClose();
			this.loadContentFromServer();
		});
	}

	handleOpen = () => {
		this.setState({ openModal: true });
	};

	handleClose = () => {
		this.setState({ openModal: false, edit: false, formData: null, cardId: null });
	};

	toggleDrawer = (id, open) => {
		this.setState({ ...this.state, cardId: id, openDrawer: open });
	};

	goBackToFiles = () => {
		this.props.navigate('files');
	}

	render() {
		const classes = this.props.classes;
		let data = [];
		let editing = this.state.edit;
		const formData = this.state.formData;
		let columns = [];

		if (!!this.state.results) {
			this.array = this.state.results;
		}

		if (!!this.state.array) {
			data = this.state.array;
		} else {
			data = this.array;
		}

		if (data && data.length > 0) {
			columns = this.getColumnMapping(data[0])
		}

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
			<div className={classes.root}>
				<Box>
					<div>
						<Button sx={{ mb: 2 }} variant="outlined" onClick={this.goBackToFiles}>Go Back</Button>
					</div>
					<MUIDataTable
						className="mui-data-table card-track"
						title={"Track Cards"}
						data={data}
						columns={columns}
						options={options}
					/>
				</Box>
				<Drawer
					anchor='right'
					open={this.state.openDrawer}
					onClose={() => this.toggleDrawer(null, false)}
				>
					<Box><CardActivity toggleDrawer={this.toggleDrawer} id={this.state.cardId} /></Box>
				</Drawer>
				<Modal
					id='edit-track-card-item'
					aria-labelledby="track-card-item"
					aria-describedby="track-card-item-description"
					open={this.state.openModal}
					onClose={this.handleClose}
				>
					<Box className={classes.modalContent}>
						<Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
							Edit {(editing && formData) && formData.Product}
							<IconButton id='close-edit-item' onClick={this.handleClose}><ClearIcon /></IconButton>
						</Typography>
						<Box component="form" id="card-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
							<Grid container spacing={3} id="card-form-element-container">
								{(editing && formData) && this.createFormElement()}
							</Grid>
							<Grid container spacing={3} sx={{ mt: 2 }} justifyContent='end'>
								<Button type='submit' id='card-form-close-button' onClick={this.handleClose} variant="outlined" sx={{ mr: 1 }}>Close</Button>
								<Button type='submit' id='card-form-submit-button' onClick={(e) => this.handleUpdate(e)} variant="contained">Update</Button>
							</Grid>
						</Box>
					</Box>
				</Modal>
			</div>
		);
	}
}
export default withStyles(styles)(CardTracks);
