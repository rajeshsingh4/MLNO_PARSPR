import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CardHeader from '@/components/cardHeader';
import avatar from '@/assets/images/avatars/avatar_13.jpg';

function Account(props) {
	return (
		<Stack spacing={6}>
			<GeneralSettingsSection {...props} />
			<ProfileSettingsSection {...props} />
			<AdvancedSettingsSection {...props} />
			<DeleteAccountSection {...props} />
		</Stack>
	);
}

function GeneralSettingsSection(props) {
	const { currentUser } = props;
	return (
		<Card type="section">
			<CardHeader title="General Settings" />
			<Stack spacing={6}>
				<Stack direction="row" spacing={6} alignItems="center" justifyContent="center">
					<Avatar
						alt="User Img"
						src={avatar}
						sx={{
							width: 150,
							height: 150,
							border: 3,
							borderColor: 'primary.light',
							borderStyle: 'dotted',
							boxShadow: (theme) =>
								`0px 0px 0px 4px ${theme.palette.background.paper} ,0px 0px 0px 6px ${theme.palette.primary[300]}`,
						}}
					/>
					<div>
						<Typography variant="caption" display="block">
							Image size Limit should be 125kb Max.
							<ErrorOutlineIcon fontSize="small" />
						</Typography>
						<Button disableElevation size="medium" variant="contained" endIcon={<AccountBoxOutlinedIcon />}>
							Change Image
						</Button>
					</div>
				</Stack>
				<Divider />
				<form onSubmit={() => {}}>
					<Grid container rowSpacing={2} columnSpacing={4}>
						<Grid item xs={12} sm={6} md={6}>
							<strong>UserName: </strong>
							<Typography>{currentUser.user.username}</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<strong>Email: </strong>
							<Typography>{currentUser.user.email}</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<strong>Phone: </strong>
							<Typography>{currentUser.phone}</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<strong>Roles: </strong>
							<ul>
								{currentUser.roles &&
									currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
							</ul>
						</Grid>
					</Grid>
				</form>
			</Stack>
		</Card>
	);
}
function ProfileSettingsSection() {
	return (
		<Card type="section">
			<CardHeader title="Public Profile" />
			<Stack spacing={3}>
				<SettingItem
					title="Make Contact Info Public"
					subtitle="Means that anyone viewing your profile will be able to see your contacts details."
				/>

				<Divider />
				<SettingItem
					title="Available to hire"
					subtitle="Toggling this will let your teammates know that you are available for acquiring new projects."
					value
				/>
			</Stack>
		</Card>
	);
}
function AdvancedSettingsSection() {
	return (
		<Card type="section">
			<CardHeader title="Advanced Settings" />
			<Grid
				container
				spacing={0}
				sx={{
					width: '100%',
					'--Grid-borderWidth': '1px',
					borderTop: 'var(--Grid-borderWidth) solid',
					borderLeft: 'var(--Grid-borderWidth) solid',
					borderColor: 'border',
					'& > div': {
						borderRight: 'var(--Grid-borderWidth) solid',
						borderBottom: 'var(--Grid-borderWidth) solid',
						borderColor: 'border',
						p: 2,
					},
				}}
			>
				<Grid item xs={12} sm={6} md={6}>
					<SettingItem title="Secure Browsing" subtitle="Browsing Securely ( https ) when it's necessary" />
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<SettingItem title="Login Notifications" subtitle="Notify when login attempted from other place" />
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<SettingItem
						title="Login approvals"
						subtitle="Approvals is not required when login from unrecognized devices."
						value
					/>
				</Grid>
			</Grid>
		</Card>
	);
}
function DeleteAccountSection() {
	return (
		<Stack
			sx={{
				borderRadius: 1,
				border: 2,
				borderColor: 'red',
				borderStyle: 'dotted',
				bgcolor: 'background.paper',
				p: 3,
			}}
		>
			<CardHeader title="Delete Account" />
			<Typography mb={2}>
				To de-activate your account, first delete its resources. If you are the only owner of any teams, either
				assign another owner or de-activate the team.
			</Typography>
			<Button variant="outlined" color="error">
				Desactivate Account
			</Button>
		</Stack>
	);
}

function SettingItem({ title, subtitle, value }) {
	return (
		<Stack direction="row" justifyContent="space-between">
			<div>
				<Typography variant="h6" gutterBottom>
					{title}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{subtitle}
				</Typography>
			</div>
			<Switch defaultChecked={value} />
		</Stack>
	);
}

export default Account;
