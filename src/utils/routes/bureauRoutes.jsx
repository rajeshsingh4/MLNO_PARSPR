import { lazy } from 'react';
import { Route } from 'react-router-dom';
import withLazyLoadably from '@hocs/withLazyLoadably';

const BureauCardList = withLazyLoadably(lazy(() => import('@/pages/bureau/cards/BureauCardList')));
const PendingReportDashboard = withLazyLoadably(
	lazy(() => import('@/pages/bureau/dashboard/BureauPendingReportDashboard')),
);
const BureauDashboardPage = withLazyLoadably(lazy(() => import('@/pages/bureau/dashboard/BureauDashboard')));
const BureauPullRequestList = withLazyLoadably(lazy(() => import('@/pages/bureau/pull/BureauPullRequestList')));
const BureauViewPullRequestDetails = withLazyLoadably(
	lazy(() => import('@/pages/bureau/pull/BureauViewPullRequestDetails')),
);
const FileTATReportPage = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/FileTATReport')));
// const BureauPullRequestDashboard = withLazyLoadably(
// 	lazy(() => import('@/pages/bank/dashboard/BureauPullRequestDashboard')),
// );

function BureauRoutes() {
	return (
		<>
			<Route index element={<BureauDashboardPage />} />
			<Route path="bureau">
				<Route index element={<BureauDashboardPage />} />
				<Route path="dashboard" element={<BureauDashboardPage />} />
				<Route path="pull">
					{/* <Route index path="dashboard" element={<BureauPullRequestDashboard />} /> */}
					{/* <Route path="create" element={<h1>Create Pull Requests for bureau</h1>} /> */}
					<Route path="cards" element={<BureauCardList />} />
					<Route path="list" element={<BureauPullRequestList />} />
					<Route path="view/:id" element={<BureauViewPullRequestDetails />} />
				</Route>
				<Route path="file">
					<Route path="filetatreport" element={<FileTATReportPage />} />
					<Route path="pending-report" element={<PendingReportDashboard />} />
				</Route>
			</Route>
		</>
	);
}

export default BureauRoutes;
