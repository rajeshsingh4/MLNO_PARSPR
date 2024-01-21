import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import PageHeader from '@/components/pageHeader';
import Loader from '@/components/loader';
import UserListService from '@/utils/services/user.service';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

export default function UserList() {
	const [userListLoader, setUserListLoader] = React.useState(false);
	const [userListError, setUserListError] = React.useState(false);
	const [userList, setUserList] = React.useState([]);
	const [openModal, setModalOpen] = React.useState(false);
	const [openEditModal, setEditModalOpen] = React.useState(false);
	const [isEdit, setEdit] = React.useState(null);

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

	const handleCreateModalOpen = () => {
		setModalOpen(true);
	};

	const handleCreateCloseModal = () => {
		setModalOpen(false);
	};

	const handleEdit = (row) => {
		setEdit({ ...row });
		setEditModalOpen(true);
	};

	const handleEditCloseModal = () => {
		setEditModalOpen(false);
		setEdit(null);
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
						onClick={handleCreateModalOpen}
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
			{openModal && <CreateUserForm handleCloseModal={handleCreateCloseModal} reloadUserList={getUserList} />}
			{openEditModal && (
				<EditUserForm
					userDetails={isEdit}
					handleCloseModal={handleEditCloseModal}
					reloadUserList={getUserList}
				/>
			)}
		</>
	);
}
