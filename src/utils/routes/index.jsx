import { useEffect, lazy, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import withLazyLoadably from '@hocs/withLazyLoadably';

import BankRoutes from './bankRoutes';
import BureauRoutes from './bureauRoutes';
import SuperadminRoutes from './superadminRoutes';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';
import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import Page404 from '@/pages/errorPages/404';

import UserService from '@/utils/services/user.service';

// import Loader from '@/components/loader';
// const Dashboard1Page = withLazyLoadably(lazy(() => import('@/pages/dashboardsPages/bankDashboard')));
// const FormsComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/forms')));
// const LoadersComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/loaders')));
// const TablesComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/tables')));
// const ModalComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/modal')));
// const SnackbarComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/snackbar')));
// const CarouselComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/carousel')));
// const NavigationComponentPage = withLazyLoadably(lazy(() => import('@/pages/componentsPages/navigation')));
// const CardComponentPage = withLazyLoadably(lazy(() => import('@/pages/uiComponentsPages/card')));
// const CardHeaderComponentPage = withLazyLoadably(lazy(() => import('@/pages/uiComponentsPages/cardHeader')));
// const PageHeaderComponentPage = withLazyLoadably(lazy(() => import('@/pages/uiComponentsPages/pageHeader')));
// const SignupSplitPage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signupSplit')));
// const SignupSimplePage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signupSimple')));
// const SignupPage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signup')));
// const Page403 = withLazyLoadably(lazy(() => import('@/pages/errorPages/403')));
// const Page500 = withLazyLoadably(lazy(() => import('@/pages/errorPages/500')));
// const Page503 = withLazyLoadably(lazy(() => import('@/pages/errorPages/503')));
// const Page505 = withLazyLoadably(lazy(() => import('@/pages/errorPages/505')));
// const Pricing1Page = withLazyLoadably(lazy(() => import('@/pages/pricingPages/pricing1')));
// const Pricing2Page = withLazyLoadably(lazy(() => import('@/pages/pricingPages/pricing2')));
// const NotificationsPage = withLazyLoadably(lazy(() => import('@/pages/notificationsPage')));
// const WIPPage = withLazyLoadably(lazy(() => import('@/pages/wip')));
// const SamplePage = withLazyLoadably(lazy(() => import('@/pages/sample')));
// const ThemeTypographyPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeTypography')));
// const ThemeColorsPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeColors')));
// const ThemeShadowPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeShadow')));

const LandingPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/landing')));
const LoginBankPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/bank')));
const LoginBureauPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/bureau')));
const LoginSuperadminPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/superadmin')));
const LoginCourierPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/courier')));
const EditProfilePage = withLazyLoadably(lazy(() => import('@/pages/editProfile')));

function Router() {
	const [menuRole, setMenuRoles] = useState(null);
	const { location, localStorage } = window;

	const isLoginSignupForgot =
		location.pathname.includes('/login') ||
		location.pathname.includes('/register') ||
		location.pathname.includes('/forgot');

	const getMenuRoles = async () => {
		try {
			const menu = await UserService.getMenu();
			setMenuRoles(menu);
		} catch (error) {
			console.error('Error fetching roles for user', error.message);
		}
	};

	useEffect(() => {
		if (!isLoginSignupForgot) {
			getMenuRoles();
		}
	}, []);

	if (isLoginSignupForgot) {
		const loginPathName = location.pathname || '/login/landing';

		let loginPathRoute = 'bank';
		let LoginElement = LoginBankPage;
		if (loginPathName === '/login/bureau') {
			loginPathRoute = 'bureau';
			LoginElement = LoginBureauPage;
		} else if (loginPathName === '/login/courier') {
			loginPathRoute = 'courier';
			LoginElement = LoginCourierPage;
		} else if (loginPathName === '/login/superadmin') {
			loginPathRoute = 'superadmin';
			LoginElement = LoginSuperadminPage;
		}
		return (
			<BrowserRouter>
				<ScrollToTopOnRouteChange>
					<Routes>
						<Route path="/" element={<MinimalLayout />}>
							<Route path="login/">
								<Route path={loginPathRoute} element={<LoginElement />} />
								<Route path="landing" element={<LandingPage />} />
							</Route>
						</Route>
					</Routes>
				</ScrollToTopOnRouteChange>
			</BrowserRouter>
		);
	}

	/* if (!menuRole) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	} */

	const navigateTo = localStorage.getItem('navigateTo') || '/login/landing';

	let loginType = 'bank';
	if (navigateTo === '/login/bureau') {
		loginType = 'bureau';
	} else if (navigateTo === '/login/courier') {
		loginType = 'courier';
	} else if (navigateTo === '/login/superadmin') {
		loginType = 'superadmin';
	}

	return (
		<BrowserRouter>
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route
						path="/"
						element={<MainLayout loginType={loginType} menuRoles={menuRole} />}
						menuRoles={menuRole}
					>
						{loginType === 'superadmin' && SuperadminRoutes()}
						{loginType === 'bank' && BankRoutes()}
						{loginType === 'bureau' && BureauRoutes()}
						{loginType === 'courier' && BankRoutes()}
						{loginType !== 'superadmin' && (
							<Route path="user/">
								<Route path="profile" element={<EditProfilePage />} />
							</Route>
						)}
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
