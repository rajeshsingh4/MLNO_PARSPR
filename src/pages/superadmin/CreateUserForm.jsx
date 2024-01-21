import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import UserService from '@/utils/services/user.service';

const OrganisationList = [
	{
		label: 'HDFC',
		value: 'HDFC',
	},
	{
		label: 'SBI',
		value: 'SBI',
	},
	{
		label: 'IDFC',
		value: 'IDFC',
	},
	{
		label: 'Bureau 1',
		value: 'Bureau1',
	},
	{
		label: 'Bureau 2',
		value: 'Bureau2',
	},
	{
		label: 'Bureau 3',
		value: 'Bureau3',
	},
	{
		label: 'Bureau 4',
		value: 'Bureau4',
	},
	{
		label: 'Courier 1',
		value: 'Courier1',
	},
	{
		label: 'Courier 2',
		value: 'Courier2',
	},
	{
		label: 'Courier 3',
		value: 'Courier3',
	},
	{
		label: 'Courier 4',
		value: 'Courier4',
	},
];

const initialState = () => ({
	username: '',
	email: '',
	type: '',
	organisation: '',
	firstname: '',
	middlename: '',
	lastname: '',
	phone: '',
	pincode: '',
	address: '',
	bio: '',
});

function CreateUserForm(props) {
	const { handleCloseModal, reloadUserList } = props;
	const [formData, setFormData] = useState(initialState());

	const updateFormData = (e) => {
		const { name } = e.target;
		const { value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateFields = () => {
		const requiredFields = ['username', 'email', 'type', 'organisation', 'firstname', 'lastname'];
		const listFields = Object.keys(formData);
		const requiredFieldObj = {};
		listFields.forEach((key) => {
			if (requiredFields.includes(key) && formData[key] === '') {
				requiredFieldObj[key] = true;
			}
		});
		return requiredFieldObj;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = validateFields();
		if (Object.keys(isValid).length > 0) {
			return false;
		}
		const createUserData = {
			...formData,
			middlename: formData.middlename === '' ? null : formData.middlename,
			phone: formData.phone === '' ? null : formData.phone,
			bio: formData.bio === '' ? null : formData.bio,
			address: formData.address === '' ? null : formData.address,
			pincode: formData.pincode === '' ? null : formData.pincode,
		};
		try {
			const createUser = await UserService.createNewUser(createUserData);
			if (createUser.status === 200) {
				reloadUserList();
				handleCloseModal();
			} else {
				console.error('Error creating user: ', createUser.body);
			}
		} catch (err) {
			console.error('Error creating new user: ', err.message);
		}
		return true;
	};

	return (
		<Dialog
			id="create-user-item"
			aria-labelledby="user-item"
			aria-describedby="user-item-description"
			open
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
					Create User
					<IconButton id="close-edit-item" onClick={handleCloseModal}>
						<ClearIcon />
					</IconButton>
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box component="form" id="user-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
					<Grid container spacing={3} id="user-organisation-container">
						<Grid xs={12}>
							<Typography>Organisation Details</Typography>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="username"
								name="username"
								label="Username"
								placeholder="Enter username"
								value={formData.username}
								onChange={(e) => updateFormData(e)}
								type="text"
								fullWidth
								required
								size="medium"
								// error={validFieldState.username}
								// helperText={validFieldState.username ? 'Please enter username' : ''}
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="email"
								name="email"
								label="Email"
								placeholder="Enter email"
								value={formData.email}
								onChange={(e) => updateFormData(e)}
								type="text"
								fullWidth
								required
								size="medium"
								// error={validFieldState.email}
								// helperText={validFieldState.email ? 'Please enter Email' : ''}
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="user-type"
								name="type"
								label="User Type"
								placeholder="Select User Type"
								value={formData.type}
								onChange={(e) => updateFormData(e)}
								select
								fullWidth
								required
								size="medium"
								// error={validFieldState.type}
								// helperText={validFieldState.type ? 'Please select user type' : ''}
							>
								<MenuItem value="bank">Bank</MenuItem>
								<MenuItem value="bureau">Bureau</MenuItem>
								<MenuItem value="courier">Courier</MenuItem>
							</TextField>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="user-organisation"
								name="organisation"
								label="Organisation"
								placeholder="Select Organisation"
								value={formData.organisation}
								onChange={(e) => updateFormData(e)}
								select
								fullWidth
								required
								size="medium"
								// error={validFieldState.organisation}
								// helperText={validFieldState.organisation ? 'Please select an organisation' : ''}
							>
								{OrganisationList.map((option) => (
									<MenuItem key={option.label} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
					<Grid container spacing={3} id="user-deatils-container">
						<Grid xs={12}>
							<Typography>User Details</Typography>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="firstname"
								name="firstname"
								label="First name"
								placeholder="Enter firstname"
								value={formData.firstname}
								onChange={(e) => updateFormData(e)}
								type="text"
								fullWidth
								required
								size="medium"
								// error={validFieldState.firstname}
								// helperText={validFieldState.firstname ? 'Please enter firstname' : ''}
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="middlename"
								name="middlename"
								label="Middle name"
								placeholder="Enter middlename"
								value={formData.middlename}
								onChange={(e) => updateFormData(e)}
								type="text"
								fullWidth
								size="medium"
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="lastname"
								name="lastname"
								label="Last name"
								placeholder="Enter lastname"
								value={formData.lastname}
								onChange={(e) => updateFormData(e)}
								type="text"
								fullWidth
								required
								size="medium"
								// error={validFieldState.lastname}
								// helperText={validFieldState.lastname ? 'Please enter lastname' : ''}
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="address"
								name="address"
								label="Address"
								placeholder="Enter address"
								value={formData.address}
								onChange={(e) => updateFormData(e)}
								type="text"
								rows={4}
								multiline
								fullWidth
								size="medium"
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="pincode"
								name="pincode"
								label="Pincode"
								placeholder="Enter pincode"
								value={formData.pincode}
								onChange={(e) => updateFormData(e)}
								type="number"
								inputProps={{
									min: '000000',
									max: '999999',
									step: '1',
								}}
								fullWidth
								size="medium"
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="phone"
								name="phone"
								label="Phone number"
								placeholder="Enter phone number"
								value={formData.phone}
								onChange={(e) => updateFormData(e)}
								type="number"
								inputProps={{
									min: '0000000000',
									max: '9999999999',
									step: '1',
								}}
								fullWidth
								size="medium"
							/>
						</Grid>
						<Grid xs={12} sm={6} md={4}>
							<TextField
								id="bio"
								name="bio"
								label="Bio"
								placeholder="Enter bio"
								value={formData.bio}
								onChange={(e) => updateFormData(e)}
								rows={4}
								multiline
								fullWidth
								size="medium"
							/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Grid container justifyContent="end">
					<Button
						type="submit"
						id="user-form-close-button"
						onClick={handleCloseModal}
						variant="outlined"
						sx={{ mr: 1 }}
					>
						Close
					</Button>
					<Button
						type="submit"
						id="user-form-submit-button"
						onClick={(e) => handleSubmit(e)}
						variant="contained"
						disabled={Object.keys(validateFields()).length > 0}
					>
						Create User
					</Button>
				</Grid>
			</DialogActions>
		</Dialog>
	);
}

export default CreateUserForm;
