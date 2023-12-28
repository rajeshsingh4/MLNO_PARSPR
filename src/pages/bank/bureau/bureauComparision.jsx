import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import FileMasterListService from '@/utils/services/files.services';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/pageHeader';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ChartPie from './Chart';
import CardHeader from '@/components/cardHeader';

function BureauComparision() {
	const [bureauList, setBureauList] = React.useState([]);
	const [fileList, setFileList] = React.useState([]);
	const [selectedBureau, setSelectedBureau] = React.useState([]);
	const [fileListLoader, setFileListLoader] = React.useState(false);
	const [fileListError, setFileListError] = React.useState(false);

	const setBureauGroupfun = (bureauDetails) => {
		const uniqueBureauData = [...new Map(bureauDetails.map((item) => [item.BureauName, item])).values()];
		setBureauList(uniqueBureauData);
	};
	const getBureauComparisonList = async () => {
		setFileListLoader(true);
		try {
			const bureauDetails = await FileMasterListService.getFileMasterList();
			setBureauGroupfun(bureauDetails.data);
			setFileList(bureauDetails.data);
		} catch (err) {
			console.error('Error fetching list of files for Bureau Comparison dashboard ', err);
			setFileListError(true);
		} finally {
			setFileListLoader(false);
		}
	};

	React.useEffect(() => {
		getBureauComparisonList();
	}, []);

	const handleBureauSelect = (e, bureau) => {
		const { checked } = e.target;
		if (checked) {
			setSelectedBureau([...selectedBureau, bureau.BureauName]);
		} else {
			setSelectedBureau(selectedBureau.filter((bu) => bu !== bureau.BureauName));
		}
	};

	const getBureauFilesNCards = (bureauName) => fileList.filter((file) => file.BureauName === bureauName);

	const getSelectedBureauFiles = () => fileList.filter((file) => selectedBureau.includes(file.BureauName));

	if (fileListLoader) {
		return <div>Loding....</div>;
	}

	if (fileListError) {
		return <>Error loading files....</>;
	}

	return (
		<>
			<PageHeader title="Bureau Comparision">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/dashboards/dashboard1">
						Dashboard
					</Link>
					<Typography color="text.tertiary">bureau</Typography>
					<Typography color="text.tertiary">Bureau Comparision</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6} md={6}>
						<Card component="section" type="section">
							<FormGroup>
								<Grid container>
									<Grid item xs={4} sm={4} md={4}>
										{bureauList.map((bureau) => (
											<FormControlLabel
												key={bureau.id}
												control={<Checkbox onChange={(e) => handleBureauSelect(e, bureau)} />}
												label={bureau.BureauName}
											/>
										))}
									</Grid>
								</Grid>
							</FormGroup>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Card>
							<CardHeader title="Consolidated Matrix" size="small" />
							{selectedBureau.length > 0 && (
								<ChartPie
									files={getSelectedBureauFiles()}
									bureau={{ BureauName: 'Consolidated Matrix' }}
								/>
							)}
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Card>
							<CardHeader title="Overall Matrix" size="small" />
							<ChartPie files={fileList} bureau={{ BureauName: 'Overall Matrix' }} />
						</Card>
					</Grid>
				</Grid>
				<Grid container spacing={2} mt={2}>
					{bureauList.map(
						(bureau) =>
							selectedBureau.includes(bureau.BureauName) && (
								<Grid item xs={12} sm={3} key={bureau.id} className="selected-bureau-matrix">
									<Card component="section" type="section">
										<CardHeader title={bureau.BureauName} size="small" />
										<ChartPie files={getBureauFilesNCards(bureau.BureauName)} bureau={bureau} />
									</Card>
								</Grid>
							),
					)}
				</Grid>
			</Container>
		</>
	);
}

export default BureauComparision;
