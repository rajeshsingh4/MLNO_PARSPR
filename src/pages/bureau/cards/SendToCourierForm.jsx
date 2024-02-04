import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import CardTrackingService from '@/utils/services/card.service';

const initialFormData = () => ({
	AWB_No: '',
	Comments: '',
	Bureau_Status: 1,
	Courier_Status: 0,
	Courier_Status_Timestamp: new Date(),
});

function SendToCourierForm(props) {
	const { handleClose, pullRequestModal, goBackTo = '/bureau/pull/list' } = props;
	const {
		tableMeta: { rowIndex, tableData },
		isEdit,
	} = pullRequestModal;

	const [formData, setFormData] = useState(initialFormData());

	const navigate = useNavigate();

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		const updatedData = {
			...formData,
			[name]: value || '',
		};
		switch (name) {
			case 'field':
				updatedData.originalValue = tableData[rowIndex][value] || '';
				break;
			default:
				break;
		}
		setFormData(updatedData);
	};

	const handleCreateUpdate = async (e) => {
		e.preventDefault();
		console.log('submit pull request Data', formData);
		try {
			const data = await CardTrackingService.postBureauCardsToCourier(tableData[rowIndex].id, formData);
			console.log(data);
			if (data.status !== 200 || data.data.status) {
				// handleSnackBarOpen('error', 'Error creating pull request');
				console.error('There was an error creating the Pull Request. Please try again!!');
			} else {
				// handleSnackBarOpen('success', 'Pull request created successfully');
				handleClose();
				setTimeout(() => {
					navigate(goBackTo);
				}, 500);
			}
		} catch (error) {
			console.error('There was an error creating the Pull Request. Please try again!!', error);
		}
	};

	return (
		<Dialog
			open
			fullScreen={false}
			onClose={handleClose}
			id="post-send-to-courier"
			aria-labelledby="send-to-courier"
			aria-describedby="send-to-courier-description"
		>
			<DialogTitle id="scroll-dialog-title">Send Card to courier</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>
				<Box component="form" id="card-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
					<Grid container spacing={3} id="card-form-element-container">
						<Grid xs={12}>
							<TextField
								id="awb-number-item"
								label="AWB Number"
								name="AWB_No"
								type="text"
								value={formData.AWB_No}
								required
								fullWidth
								onChange={(e) => handleFormChange(e)}
							/>
						</Grid>
						<Grid xs={12}>
							<TextField
								id="outlined-multiline-static"
								label="Comments"
								name="Comments"
								fullWidth
								multiline
								rows={4}
								onChange={(e) => handleFormChange(e)}
								value={formData.Comments}
							/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					id="pull-request-form-close-button"
					onClick={handleClose}
					variant="outlined"
					sx={{
						mr: 1,
					}}
				>
					Close
				</Button>
				<Button
					type="submit"
					id="pull-request-form-submit-button"
					onClick={(e) => handleCreateUpdate(e)}
					variant="contained"
				>
					{isEdit ? 'Edit' : 'Create'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SendToCourierForm;
