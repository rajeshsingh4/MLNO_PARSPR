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
import UserService from '@/utils/services/user.service';

const getFieldsFromProps = (data) => ({
	firstname: data.firstname,
	middlename: data.middlename || '',
	lastname: data.lastname,
	pincode: data.pincode || '',
	phone: data.phone || '',
	address: data.address || '',
	bio: data.bio || '',
});

function EditUserForm(props) {
	const { handleCloseModal, reloadUserList, userDetails } = props;
	const [formData, setFormData] = useState(getFieldsFromProps(userDetails));

	const updateFormData = (e) => {
		const { name } = e.target;
		const { value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateFields = () => {
		const requiredFields = ['firstname', 'lastname'];
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
		try {
			const createUser = await UserService.updateUserDetails(userDetails.id, formData);
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
			id="edit-user-item"
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
					Edit User
					<IconButton id="close-edit-item" onClick={handleCloseModal}>
						<ClearIcon />
					</IconButton>
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box component="form" id="edit-user-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
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
						Update User
					</Button>
				</Grid>
			</DialogActions>
		</Dialog>
	);
}

export default EditUserForm;
