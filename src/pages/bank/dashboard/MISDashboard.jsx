import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PageHeader from '@/components/pageHeader';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

function MISDashboard(props) {
	return (
		<>
			<PageHeader title="MIS Dashboard">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
				</Breadcrumbs>
			</PageHeader>
			<Stack spacing={3} />
		</>
	);
}

export default MISDashboard;
