import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import PageHeader from '@/components/pageHeader';
import Loader from '@/components/loader';
import UserListService from '@/utils/services/user.service';

export default function UserList() {
	const [userListLoader, setUserListLoader] = React.useState(false);
	const [userListError, setUserListError] = React.useState(false);
	const [userList, setUserList] = React.useState([]);
	const [openModal, setModalOpen] = React.useState(false);
	const [isEdit, setEdit] = React.useState(false);
	const [formData, setFormData] = React.useState({});

	const getUserList = async () => {
		setUserListLoader(true);
		try {
			const fileTATDetails = await UserListService.getAllUsers();
			setUserList(fileTATDetails.data);
		} catch (err) {
			console.error('Error fetching list of users ', err);
			setUserListError(true);
		} finally {
			setUserListLoader(false);
		}
	};

	React.useEffect(() => {
		getUserList();
	}, []);

	if (userListLoader) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (userListError) {
		return <>Error Loading User List, Please try again!!</>;
	}

	const handleModalOpen = () => {
		setModalOpen(true);
		setFormData({});
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setEdit(null);
	};

	const handleEdit = (row) => {
		setFormData({ ...row });
		setModalOpen(true);
		setEdit(true);
	};

	const updateFormData = (e) => {
		const { name } = e.target;
		const { value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit details');
	};

	const createFormElement = () => {
		const hiddenElements = ['id', 'createdAt', 'updatedAt', 'user', 'userId', 'createdBy', 'modifiedBy'];
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

	const getColumnMapping = (row) => {
		const fieldList = [];
		if (!row) {
			return fieldList;
		}
		const listKey = Object.keys(row);

		const hiddenColumns = ['createdBy', 'modifiedBy', 'user'];

		listKey.forEach((key, i) => {
			const baseFieldObj = {
				field: key,
				headerName: key,
				description: key, // shows as tooltip
				hideable: true, // user can show hide the column
				sortable: true,
				width: 150,
				editable: false,
			};
			if (key === 'id') {
				baseFieldObj.headerName = 'S. No.';
				baseFieldObj.description = 'S. No.';
				baseFieldObj.width = 80;
				baseFieldObj.hideable = false;
			}
			if (key === 'createdAt') {
				baseFieldObj.headerName = 'Created At';
				baseFieldObj.description = 'Created At';
				baseFieldObj.valueGetter = (params) => new Date(params.row.createdAt).toString();
			}
			if (key === 'updatedAt') {
				baseFieldObj.headerName = 'Updated At';
				baseFieldObj.description = 'Updated At';
				baseFieldObj.valueGetter = (params) => new Date(params.row.updatedAt).toString();
			}
			if (key === 'userId') {
				baseFieldObj.headerName = 'Actions';
				baseFieldObj.description = 'Actions';
				baseFieldObj.renderCell = (params) => (
					<IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
						<EditIcon />
					</IconButton>
				);
			}
			if (!hiddenColumns.includes(key)) {
				fieldList.push(baseFieldObj);
			}
		});
		return fieldList;
	};

	return (
		<>
			<PageHeader title="User List">
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
				<Grid container spacing={3} justifyContent="end">
					<Button
						aria-label="create"
						onClick={handleModalOpen}
						variant="contained"
						color="grey"
						sx={{ mb: 2 }}
					>
						<AddIcon />
					</Button>
				</Grid>
				<Card component="section" type="section">
					<DataGrid
						className="mui-data-grid users-list"
						loading={userListLoader}
						rows={userList}
						columns={getColumnMapping(userList[0])}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 10 },
							},
						}}
						pageSizeOptions={[10, 20, 50, 100]}
						// checkboxSelection
					/>
				</Card>
			</Container>
			<Dialog
				id="create-edit-user-item"
				aria-labelledby="user-item"
				aria-describedby="user-item-description"
				open={openModal}
				onClose={handleCloseModal}
				maxWidth="md"
				sx={{ '& > div[aria-labelledby="user-item"]': { overflow: 'hidden' } }}
			>
				<DialogTitle>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="span"
						sx={{ display: 'flex', justifyContent: 'space-between' }}
					>
						{isEdit ? `Edit ${formData.username}` : 'Create User'}
						<IconButton id="close-edit-item" onClick={handleCloseModal}>
							<ClearIcon />
						</IconButton>
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Box>
						<Box
							component="form"
							id="user-form-container"
							noValidate
							autoComplete="off"
							sx={{ mt: 2, mb: 1 }}
						>
							<Grid container spacing={3} id="user-form-element-container">
								{isEdit && formData && createFormElement()}
							</Grid>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Grid container justifyContent="end">
						<Button
							type="submit"
							id="card-form-close-button"
							onClick={handleCloseModal}
							variant="outlined"
							sx={{ mr: 1 }}
						>
							Close
						</Button>
						<Button
							type="submit"
							id="card-form-submit-button"
							onClick={(e) => handleSubmit(e)}
							variant="contained"
						>
							{isEdit ? 'Update User' : 'Create User'}
						</Button>
					</Grid>
				</DialogActions>
			</Dialog>
		</>
	);
}
