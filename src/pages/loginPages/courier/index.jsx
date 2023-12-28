import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import logo from '@/assets/images/logo/png/mlnologo.png';
import LoginIcon from '@mui/icons-material/Login';

function LoginCourier() {
	return (
		<Container>
			<Card elevation={20} type="none" variant="elevation" sx={{ my: 6 }} hover={false}>
				<Grid
					container
					spacing={0}
					sx={{
						minHeight: 500,
					}}
				>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<Box
							py={8}
							px={{
								xs: 2,
								md: 8,
							}}
							sx={{ display: 'grid', placeItems: 'center', height: '100%' }}
						>
							<Stack direction="column" spacing={5} justifyContent="space-between" height="100%">
								<div>
									<Typography variant="h1" fontWeight="medium">
										Login To MLNO Courier Dashboard!
									</Typography>
								</div>
								<LoginForm />
							</Stack>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<Stack
							bgcolor="primary.main"
							direction="column"
							justifyContent="space-between"
							height="100%"
							width="100%"
							color="primary.light"
							p="10%"
							spacing={3}
						>
							<Box
								component="img"
								src={logo}
								alt="slim logo"
								sx={{
									mx: 'auto',
									width: { xs: '100%', sm: '70%' },
									objectFit: 'contain',
									borderBottom: 1,
									borderColor: 'secondary.main',
								}}
							/>

							<Typography variant="body2" color="inherit">
								Streamlining the data-to-card delivery process is our expertise.dvertising.
							</Typography>

							<Typography variant="body2" color="inherit">
								Count on us to relieve you of the pain in handling the day-to-day affairs. While you
								focus on your core business needs, we interact on your behalf with all your vendors, get
								all requirements fulfilled and ensure proactive escalation to meet stringent SLAs. We
								empower financial institutions to stay competitive with data-driven decision making,
								improved customer service delivery and collation of all information at one central
								location.
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Card>
		</Container>
	);
}

function LoginForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submit');
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			navigate('/');
		}, 1000);
	};
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				autoFocus
				color="primary"
				name="Email"
				label="Email"
				margin="normal"
				variant="outlined"
				fullWidth
			/>
			<TextField
				color="primary"
				name="password"
				type="password"
				margin="normal"
				label="Password"
				variant="outlined"
				fullWidth
			/>
			<Link to="/resetPassword" component={RouterLink} color="tertiary.main">
				Forgot password?
			</Link>
		</form>
	);
}

export default LoginCourier;
