import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';
import TabletAndroidTwoToneIcon from '@mui/icons-material/TabletAndroidTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import CardHeader from '@/components/cardHeader';
import AuthService from '@/utils/services/auth.service';

function Security(props) {
	return (
		<Stack spacing={6}>
			<PassworSection {...props} />
			<MultifactorSection {...props} />
			<SessionsSection {...props} />
		</Stack>
	);
}

function PassworSection(props) {
	const [passwordForm, setPasswordForm] = React.useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [alertMessage, setAlertMessage] = React.useState({
		type: 'info',
		message: '',
	});

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		setPasswordForm({
			...passwordForm,
			[name]: value,
		});
	};

	const handlePasswordUpdate = async () => {
		console.log('formData', passwordForm);
		if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
			return;
		}
		if (passwordForm.currentPassword === passwordForm.newPassword) {
			return;
		}
		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			console.error('Passwords do not match');
			return;
		}
		let type = 'error';
		let message = '';
		try {
			const changedPassword = await AuthService.changePassword(passwordForm);
			if (changedPassword.status === 401) {
				if (changedPassword.data.invalidPassword || !changedPassword.data.passwordMatch) {
					message = changedPassword.data.message;
				} else {
					message = 'Unable to change password';
				}
			} else if (changedPassword.status === 400) {
				message = changedPassword.data.message;
			} else {
				type = 'success';
				message = "Password updated successfully. You'll be logged out in 5sec. Please login again";
				setTimeout(() => {
					localStorage.removeItem('user');
					window.location.replace('/login');
				}, 5000);
			}
		} catch (error) {
			console.error('Error changing password ', error.message);
			message = error.message;
		} finally {
			setAlertMessage({
				type,
				message,
			});
		}
	};
	return (
		<Card type="section">
			<CardHeader title="Change Password" subtitle="Update Profile Security" />
			<Stack spacing={3}>
				<Alert severity="warning">
					<AlertTitle>Alert!</AlertTitle>
					Your Password will expire in every 3 months. So change it periodically.
					<b> Do not share your password</b>
				</Alert>
				<form onSubmit={() => {}}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								id="current-password"
								name="currentPassword"
								label="Current Password"
								type="password"
								onChange={(e) => handlePasswordChange(e)}
								value={passwordForm.currentPassword}
								required
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								id="new-password"
								name="newPassword"
								label="New Password"
								type="password"
								onChange={(e) => handlePasswordChange(e)}
								value={passwordForm.newPassword}
								error={
									(passwordForm.currentPassword !== '' || passwordForm.newPassword !== '') &&
									passwordForm.newPassword === passwordForm.currentPassword
								}
								helperText={
									(passwordForm.currentPassword !== '' || passwordForm.newPassword !== '') &&
									passwordForm.newPassword === passwordForm.currentPassword
										? 'New Password cannot be same as current password'
										: ''
								}
								required
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<TextField
								id="confirm-password"
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								error={
									passwordForm.confirmPassword !== '' &&
									passwordForm.newPassword !== passwordForm.confirmPassword
								}
								onChange={(e) => handlePasswordChange(e)}
								value={passwordForm.confirmPassword}
								helperText={
									passwordForm.confirmPassword !== '' &&
									passwordForm.newPassword !== passwordForm.confirmPassword
										? 'Password does not match'
										: ''
								}
								required
								fullWidth
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<Button
								disableElevation
								variant="contained"
								sx={{
									float: 'right',
								}}
								onClick={handlePasswordUpdate}
								disabled={
									passwordForm.currentPassword === '' ||
									passwordForm.newPassword === '' ||
									passwordForm.confirmPassword === '' ||
									passwordForm.currentPassword === passwordForm.newPassword ||
									passwordForm.newPassword !== passwordForm.confirmPassword
								}
							>
								Change Password
							</Button>
						</Grid>
					</Grid>
				</form>
			</Stack>
		</Card>
	);
}
function MultifactorSection() {
	return (
		<Card type="section">
			<CardHeader title="Multi Factor Authentication" />
			<Grid container spacing={5}>
				<Grid item xs={12} sm={6} md={6}>
					<Stack
						spacing={1}
						border={1}
						borderRadius={1}
						borderColor="text.hint"
						p={2}
						sx={{
							'&:hover': {
								borderColor: 'border',
							},
						}}
					>
						<Typography color="error">
							<Box
								component="span"
								width={10}
								height={10}
								bgcolor="error.main"
								borderRadius="50%"
								display="inline-block"
								mr={1}
							/>
							Off
						</Typography>
						<Typography variant="subtitle1">Authenticator App</Typography>
						<Typography variant="body1" color="textSecondary">
							Use an authenticator app to generate one time security codes.
						</Typography>
						<Button variant="outlined" sx={{ width: 'fit-content' }} endIcon={<EastIcon />}>
							Set Up
						</Button>
					</Stack>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<Stack
						spacing={1}
						border={1}
						borderRadius={1}
						borderColor="text.hint"
						p={2}
						height="100%"
						sx={{
							'&:hover': {
								borderColor: 'border',
							},
						}}
					>
						<Typography color="error">
							<Box
								component="span"
								width={10}
								height={10}
								bgcolor="error.main"
								borderRadius="50%"
								display="inline-block"
								mr={1}
							/>
							Off
						</Typography>
						<Typography variant="subtitle1">Text Message</Typography>
						<Typography variant="body1" color="textSecondary" flexGrow={1}>
							Use your mobile phone to receive security codes via SMS.
						</Typography>
						<Button variant="outlined" sx={{ width: 'fit-content' }} endIcon={<EastIcon />}>
							Set Up
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Card>
	);
}

function createData(time, ip, client) {
	return { time, ip, client };
}

const history = [
	createData('09:06 AM 05/07/2023', '95.130.17.84', 'Chrome, Mac OS 10.15.7'),
	createData('06:46 AM 05/07/2023', '95.130.17.84', 'Chrome, Mac OS 10.15.7'),
	createData('09:06 AM 06/07/2023', '95.130.17.84', 'Chrome, Mac OS 10.15.7'),
];

const devices = [
	{
		TypeIcon: DesktopWindowsTwoToneIcon,
		device: 'Cent Desktop',
		ubication: '4351 Deans Lane, Chelmsford',
		active: true,
	},
	{
		TypeIcon: TabletAndroidTwoToneIcon,
		device: 'Imho Tablet ',
		ubication: '4185 Michigan Avenue',
		active: false,
		last: '5 days ago',
	},
	{
		TypeIcon: PhoneAndroidTwoToneIcon,
		device: 'Albs Mobile',
		ubication: '3462 Fairfax Drive, Montcalm',
		active: false,
		last: '1 month ago',
	},
];
function SessionsSection() {
	return (
		<Card type="section">
			<CardHeader title="Login history" subtitle="Your recent login activity" />
			<TableContainer>
				<Table size="small" aria-label="results table">
					<TableHead>
						<TableRow>
							<TableCell>Login Type</TableCell>
							<TableCell align="left">Ip Address</TableCell>
							<TableCell align="left">Client</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.slice(0, 5).map((row, i) => (
							<TableRow hover key={i}>
								<TableCell>
									<Typography variant="subtitle2">Credential login</Typography>
									{row.time}
								</TableCell>
								<TableCell align="left">{row.ip} </TableCell>
								<TableCell align="left">{row.client} </TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<CardHeader size="small" title="Recognized devices" sx={{ mt: 6 }} />
			<Stack spacing={1}>
				{devices.map(({ TypeIcon, device, ubication, active, last }, i) => (
					<Stack key={i} direction="row" alignItems="center" spacing={1}>
						<TypeIcon />
						<Typography variant="body1" flexGrow={1}>
							{device} <Typography variant="caption">| {ubication}</Typography>
						</Typography>
						<Typography color={active ? 'success.main' : 'text.secondary'} variant="caption">
							<Box
								width={10}
								height={10}
								bgcolor={active ? 'success.main' : '#d3d3d3'}
								borderRadius="50%"
								display="inline-block"
								mr={1}
							/>
							{active ? 'Current Active' : `Active ${last}`}
						</Typography>
						<IconButton aria-label="close" size="small" sx={{ float: 'right' }}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</Stack>
				))}
			</Stack>
			<CardHeader size="small" title="Active Sessions" sx={{ mt: 6 }} />
			<Stack spacing={1}>
				{devices.map(({ TypeIcon, device, ubication }, i) => (
					<Stack key={i} direction="row" alignItems="center" spacing={1}>
						<TypeIcon color="success" />
						<Typography variant="body1" flexGrow={1}>
							{device} <Typography variant="caption">| {ubication}</Typography>
						</Typography>
						<Button variant="text" color="error">
							Logout
						</Button>
					</Stack>
				))}
			</Stack>
		</Card>
	);
}

export default Security;
