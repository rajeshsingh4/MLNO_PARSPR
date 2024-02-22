import { lazy } from 'react';
import { Route } from 'react-router-dom';
import withLazyLoadably from '@hocs/withLazyLoadably';

const UserListPage = withLazyLoadably(lazy(() => import('@/pages/superadmin/UserList')));
const FileUploadPage = withLazyLoadably(lazy(() => import('@/pages/superadmin/FileUpload')));

function SuperadminRoutes() {
	return (
		<>
			<Route index element={<UserListPage />} />
			<Route path="superadmin">
				<Route index element={<UserListPage />} />
				<Route path="dashboard" element={<UserListPage />} />
				<Route path="fileupload" element={<FileUploadPage />} />
			</Route>
		</>
	);
}

export default SuperadminRoutes;
