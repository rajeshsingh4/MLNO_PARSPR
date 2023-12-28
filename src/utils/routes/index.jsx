import { useEffect, lazy, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';
import Loader from '@/components/loader';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';

import Page404 from '@/pages/errorPages/404';

import UserService from '@/utils/services/user.service';

const Dashboard1Page = withLazyLoadably(lazy(() => import('@/pages/dashboardsPages/bankDashboard')));
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
const LoginCourierPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/courier')));
const LoginBankPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/bank')));
const LoginBureauPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/bureau')));
// const SignupSplitPage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signupSplit')));
// const SignupSimplePage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signupSimple')));
// const SignupPage = withLazyLoadably(lazy(() => import('@/pages/signupPages/signup')));
const Page403 = withLazyLoadably(lazy(() => import('@/pages/errorPages/403')));
const Page500 = withLazyLoadably(lazy(() => import('@/pages/errorPages/500')));
const Page503 = withLazyLoadably(lazy(() => import('@/pages/errorPages/503')));
const Page505 = withLazyLoadably(lazy(() => import('@/pages/errorPages/505')));
const Pricing1Page = withLazyLoadably(lazy(() => import('@/pages/pricingPages/pricing1')));
const Pricing2Page = withLazyLoadably(lazy(() => import('@/pages/pricingPages/pricing2')));
const EditProfilePage = withLazyLoadably(lazy(() => import('@/pages/editProfile')));
const NotificationsPage = withLazyLoadably(lazy(() => import('@/pages/notificationsPage')));
const WIPPage = withLazyLoadably(lazy(() => import('@/pages/wip')));
// const SamplePage = withLazyLoadably(lazy(() => import('@/pages/sample')));
// const ThemeTypographyPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeTypography')));
// const ThemeColorsPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeColors')));
// const ThemeShadowPage = withLazyLoadably(lazy(() => import('@/pages/themePages/themeShadow')));

const FileWiseReportPage = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/fileWiseReport')));
const BureauComparisionPage = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/bureauComparision')));

function Router() {
	const [menuRole, setMenuRoles] = useState(null);
	const { location } = window;

	const getMenuRoles = async () => {
		try {
			const menu = await UserService.getMenu();
			setMenuRoles(menu);
		} catch (error) {
			console.error('Error fetching roles for user', error.message);
		}
	};

	useEffect(() => {
		if (!(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
			getMenuRoles();
		}
	}, []);

	if (!menuRole) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	return (
		<BrowserRouter>
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route path="/" element={<MinimalLayout />}>
						<Route path="pages/">
							<Route path="login/bank" element={<LoginBankPage />} />
							<Route path="login/bureau" element={<LoginBureauPage />} />
							<Route path="login/courier" element={<LoginCourierPage />} />
						</Route>
					</Route>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Dashboard1Page />} />
						<Route path="dashboards/">
							<Route path="dashboard1" element={<Dashboard1Page />} />
						</Route>

						{/* <Route path="components/">
							<Route path="forms" element={<FormsComponentPage />} />
							<Route path="loaders" element={<LoadersComponentPage />} />
							<Route path="tables" element={<TablesComponentPage />} />
							<Route path="modal" element={<ModalComponentPage />} />
							<Route path="snackbar" element={<SnackbarComponentPage />} />
							<Route path="carousel" element={<CarouselComponentPage />} />
							<Route path="navigation" element={<NavigationComponentPage />} />
							<Route path="card" element={<CardComponentPage />} />
							<Route path="cardHeader" element={<CardHeaderComponentPage />} />
							<Route path="pageHeader" element={<PageHeaderComponentPage />} />
						</Route>

						<Route path="theme/">
							<Route path="typography" element={<ThemeTypographyPage />} />
							<Route path="colors" element={<ThemeColorsPage />} />
							<Route path="boxShadow" element={<ThemeShadowPage />} />
						</Route> */}

						<Route path="bank">
							<Route path="bureau">
								<Route path="filewisereport" element={<FileWiseReportPage />} />
								<Route path="comparision" element={<BureauComparisionPage />} />
							</Route>
						</Route>
						<Route path="pages/">
							<Route path="settings" element={<EditProfilePage />} />
							<Route path="notifications" element={<NotificationsPage />} />
							<Route path="pricing/">
								<Route path="pricing1" element={<Pricing1Page />} />
								<Route path="pricing2" element={<Pricing2Page />} />
							</Route>
							<Route path="error/">
								<Route path="404" element={<Page404 />} />
								<Route path="403" element={<Page403 />} />
								<Route path="500" element={<Page500 />} />
								<Route path="503" element={<Page503 />} />
								<Route path="505" element={<Page505 />} />
							</Route>
						</Route>
					</Route>
					<Route path="/" element={<MainLayout container={false} pb={false} />}>
						<Route path="pages/">
							<Route path="wip" element={<WIPPage />} />
						</Route>
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
