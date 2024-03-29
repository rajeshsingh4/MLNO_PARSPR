import { lazy } from 'react';
import { Route } from 'react-router-dom';
import withLazyLoadably from '@hocs/withLazyLoadably';

const BankDashboardPage = withLazyLoadably(lazy(() => import('@/pages/bank/dashboard/BankDashboard')));
const MISDashboardPage = withLazyLoadably(lazy(() => import('@/pages/bank/dashboard/MISDashboard')));
const BankPullRequestList = withLazyLoadably(lazy(() => import('@/pages/bank/Pull/BankPullRequestList')));
const BankCreatePullRequestList = withLazyLoadably(lazy(() => import('@/pages/bank/Pull/BankCreatePullRequestList')));
const BankViewPullRequestDetails = withLazyLoadably(lazy(() => import('@/pages/bank/Pull/BankViewPullRequestDetails')));
const BureauComparisionPage = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/bureauComparision')));
// const BankPullRequestDashboard = withLazyLoadably(
// 	lazy(() => import('@/pages/bank/dashboard/BankPullRequestDashboard')),
// );
const PendingReportDashboard = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/BankPendingReportDashboard')));
const FileTATReportPage = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/FileTATReport')));
const FileWiseReportPage = withLazyLoadably(lazy(() => import('@/pages/bank/bureau/fileWiseReport')));
const CardTracksPage = withLazyLoadably(lazy(() => import('@/pages/bank/card/CardTracks')));

function BankRoutes() {
	return (
		<>
			<Route index element={<BankDashboardPage />} />
			<Route path="bank">
				<Route index element={<BankDashboardPage />} />
				<Route path="dashboard" element={<BankDashboardPage />} />
				<Route path="mis" element={<MISDashboardPage />} />
				<Route path="bureau">
					<Route path="filewisereport">
						<Route index element={<FileWiseReportPage />} />
						<Route path=":id" element={<CardTracksPage />} />
					</Route>
					<Route path="filetatreport" element={<FileTATReportPage />} />
					<Route path="pending-report" element={<PendingReportDashboard />} />
					<Route path="comparision" element={<BureauComparisionPage />} />
				</Route>
				<Route path="pull">
					{/* <Route index path="dashboard" element={<BankPullRequestDashboard />} /> */}
					<Route path="create" element={<BankCreatePullRequestList />} />
					<Route path="list" element={<BankPullRequestList />} />
					<Route path="view/:id" element={<BankViewPullRequestDetails />} />
				</Route>
			</Route>
		</>
	);
}

export default BankRoutes;
