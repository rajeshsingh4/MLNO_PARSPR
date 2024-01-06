import { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';
import logo from '@/assets/images/logo/png/mlnologo.png';
import AuthService from '@/utils/services/auth.service';
import Alert from '@mui/material/Alert';

function LandingPage() {
	return (
		<Container>
			<Card elevation={20} type="none" variant="elevation" sx={{ my: 6 }} hover="false">
				<Grid container spacing={3} pt={4}>
					<Grid item xs={12} sm={4} md={4}>
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
										Login To MLNO Bank Dashboard!
									</Typography>
									<Button
										variant="outlined"
										fullWidth
										color="primary"
										to="/login/bank"
										component={RouterLink}
									>
										Login
									</Button>
								</div>
							</Stack>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
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
										Login To MLNO Bureau Dashboard!
									</Typography>
									<Button
										variant="outlined"
										fullWidth
										color="primary"
										to="/login/bureau"
										component={RouterLink}
									>
										Login
									</Button>
								</div>
							</Stack>
						</Box>
					</Grid>
				</Grid>
			</Card>
		</Container>
	);
}

export default LandingPage;
