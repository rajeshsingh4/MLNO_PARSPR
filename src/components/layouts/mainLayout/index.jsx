import { Outlet, useLocation } from 'react-router-dom';
import withScrollTopFabButton from '@hocs/withScrollTopFabButton';
import WidthPageTransition from '@hocs/widthPageTransition';

import { useSelector } from '@/store';
import { selectThemeConfig } from '@/store/theme/selectors';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
// Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { BANK_NAV_LINKS_CONFIG, BUREAU_NAV_LINKS_CONFIG, SUPERADMIN_NAV_LINKS_CONFIG } from './navItems';

// Components
import Footer from '@/components/footer';
import MainHeader from '@/components/mainHeader';
import Navbar from '@/components/navbar';

function FabButton() {
	/* <Fab
		size="small"
		aria-label="scroll back to top"
		sx={{ bgcolor: 'primary.light' }}
	>
		<KeyboardArrowUpIcon color="primary" />
	</Fab> */
	return (
		<Fab size="small" aria-label="scroll back to top" color="primary">
			<KeyboardArrowUpIcon />
		</Fab>
	);
}
function MainLayout({ container = 'lg', pb = true, loginType }) {
	const location = useLocation();
	const { pageTransitions } = useSelector(selectThemeConfig);

	return (
		<Box display="flex" minHeight="100vh" flexDirection="column">
			<Header loginType={loginType} />
			<Container
				maxWidth={container}
				component="main"
				sx={{
					flex: '1 0 auto',
					...(pb && {
						pb: 5,
					}),
				}}
			>
				{pageTransitions ? (
					<WidthPageTransition location={location.key}>
						<Outlet />
					</WidthPageTransition>
				) : (
					<Outlet />
				)}
			</Container>
			{withScrollTopFabButton(FabButton)}
			<Footer />
		</Box>
	);
}

function Header({ loginType }) {
	const { stickyHeader } = useSelector(selectThemeConfig);

	let navItems = [];
	if (loginType === 'bureau') {
		navItems = BUREAU_NAV_LINKS_CONFIG;
	} else if (loginType === 'courier') {
		navItems = BANK_NAV_LINKS_CONFIG;
	} else if (loginType === 'superadmin') {
		navItems = SUPERADMIN_NAV_LINKS_CONFIG;
	}

	return (
		<>
			<MainHeader loginType={loginType} />
			{navItems && navItems.length > 0 && (
				<Navbar navItems={navItems} loginType={loginType} position={stickyHeader ? 'sticky' : 'static'} />
			)}
		</>
	);
}

export default MainLayout;
