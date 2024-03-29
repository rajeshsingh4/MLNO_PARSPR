import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

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
										onClick={() => window.location.replace('/login/bureau')}
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
