// import constants from '@/utils/constants';
// MUI
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
// import Divider from '@mui/material/Divider';
// import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import Button from '@mui/material/Button';

// Icons
// import FacebookIcon from '@mui/icons-material/Facebook';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// assets
// import logo from '@/assets/images/logo/png/Color_logo_nobg.png';

function Footer() {
	return (
		<Box bgcolor={(theme) => theme.palette.background.paper} py={3} borderTop={1} borderColor="cuaternary.300">
			<Container maxWidth="lg" component={Stack} direction="column" spacing={5}>
				{/* <Grid container spacing={3} alignContent="center" justifyContent="center" alignItems="center">
					<Grid item xs={12} sm={6} md={6}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								CONTACT
							</Typography>
							<ContactLink Icon={LocalPhoneOutlinedIcon} text="+00 000 000 00 00" />
							<ContactLink Icon={EmailOutlinedIcon} text="info@mlno.in" />
							<ContactLink Icon={LocationOnOutlinedIcon} text="A-903,	Prateek	Wisteria,	sector	77,	Noida" />
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								About Us
							</Typography>
							<FooterLink text="Policy	&	Privacy " />
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								FAQ
							</Typography>
							<FooterLink text="Usage1" />
							<FooterLink text="usage2" />
							<FooterLink text="usage3" />
						</Stack>
					</Grid>
				</Grid>

				<Divider
					variant="middle"
					sx={{
						bgcolor: (theme) => theme.palette.secondary.main,
					}}
				/> */}
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Typography variant="body1" textAlign="center">
						Copyright 2022 - {new Date().getFullYear()} © All Rights Reserved. MLNO
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}

// function ContactLink({ Icon, text }) {
// 	return (
// 		<Stack spacing={1} alignItems="center" direction="row">
// 			<Icon
// 				color="primary"
// 				sx={{
// 					mr: 3,
// 				}}
// 			/>
// 			<Typography variant="body1">{text}</Typography>
// 		</Stack>
// 	);
// }

// function FooterLink({ text }) {
// 	return (
// 		<Link
// 			variant="body2"
// 			fontWeight="300"
// 			href="#!"
// 			underline="hover"
// 			sx={{
// 				color: 'text.primary',
// 				'&:hover': {
// 					'& svg': {
// 						opacity: '1',
// 						ml: 2,
// 					},
// 				},
// 				'&::before': {
// 					content: '""',
// 					display: 'inline-block',
// 					borderRadius: '50%',
// 					bgcolor: 'primary.main',
// 					width: '4px',
// 					height: '4px',
// 					mb: '2px',
// 					mr: 2,
// 				},
// 			}}
// 		>
// 			{/* <span style={{ marginRight: '15px' }}>•</span> */}
// 			{text}
// 			<ArrowForwardIosIcon
// 				color="primary"
// 				sx={{
// 					transition: '0.3s',
// 					fontSize: '11px',
// 					ml: 0,
// 					opacity: '0',
// 				}}
// 			/>
// 		</Link>
// 	);
// }

export default Footer;
