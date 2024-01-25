import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Loader from '@/components/loader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import PageHeader from '@/components/pageHeader';
import FileMasterListService from '@/utils/services/files.services';

export default function BureauPendingReportDashboard(props) {
	const [fileList, setFileList] = React.useState([]);
	const [selectedBank, setSelectedBank] = React.useState('');
	const [fileListLoader, setFileListLoader] = React.useState(false);
	const [fileListError, setFileListError] = React.useState(false);
	const [bureauReport, setBureauReport] = React.useState(null);
	const [bureauReportLoader, setBureauReportLoader] = React.useState(false);
	const [bureauReportError, setBureauReportError] = React.useState(false);
	const [summaryDataPointsToDisplay] = React.useState(['TotalCountAllocated', 'countDispatched']);
	/* const [summaryDataPointsToDisplay]=React.useState(['TotalCountAllocated','countDispatched']);
    const [tagLabel]=React.useState({
        'TotalCountAllocated' : 'Total Count Allocated',
        'countDispatched': 'Count Dispatched'
    }); */

	const getFileList = async () => {
		setFileListLoader(true);
		try {
			const bureauDetails = await FileMasterListService.getFileMasterListForBureau();
			setFileList(bureauDetails.data);
		} catch (err) {
			console.error('Error fetching list of files for bureau report dashboard ', err);
			setFileListError(true);
		} finally {
			setFileListLoader(false);
		}
	};

	const getReportForBank = async (bureauName) => {
		setBureauReportLoader(true);
		try {
			const bureauDetails = await FileMasterListService.getBureauReport(bureauName);
			setBureauReport(bureauDetails.data);
		} catch (err) {
			console.error('Error fetching bureau report ', err);
			setBureauReportError(true);
		} finally {
			setBureauReportLoader(false);
		}
	};

	React.useEffect(() => {
		getFileList();
	}, []);

	const handleBureauSelect = (e) => {
		setSelectedBank(e.target.value);
		getReportForBank(e.target.value);
	};

	if (fileListLoader || bureauReportLoader) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (fileListError) {
		return <>Error loading bank list....!!</>;
	}

	if (bureauReportError) {
		return <>Error loading bureau reports....!!</>;
	}

	const getFileListingFromBank = () => {
		const filteredBankListing = [];
		fileList.forEach((item) => {
			item.cards.forEach((card) => {
				filteredBankListing.push(card.Bank);
			});
		});
		return [...new Set(filteredBankListing)];
	};

	return (
		<>
			<PageHeader title="Pending report">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
					<Typography color="text.tertiary">bureau</Typography>
					<Typography color="text.tertiary">Pending Report</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card component="section" type="section">
					<Box>
						<Grid container spacing={3}>
							<Grid xs={12} sm={3}>
								<FormControl sx={{ minWidth: 200 }}>
									<InputLabel id="select-bank-dashboard">Select Bank</InputLabel>
									<Select
										labelId="select-bank-dashboard"
										id="select-bank"
										value={selectedBank}
										label="Select Bank"
										onChange={(e) => handleBureauSelect(e)}
									>
										{getFileListingFromBank().map((item, index) => (
											<MenuItem key={index} value={item}>
												{item}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid xs={12} sm={6}>
								<TableContainer>
									<Table aria-label="Bureau List">
										<TableBody>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Oldest Data
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													10/05/2023
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Count of days for which old data is pending
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													44
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Overall data allocated
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													{bureauReport && bureauReport.oldestDate.overAllDataAllocated}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Overall cards within TAT
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													{bureauReport && bureauReport.oldestDate.overCardsWithInTAT}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Overall data pending
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													{bureauReport && bureauReport.oldestDate.overCardsCountPending}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Overall cards within TAT %
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													{bureauReport &&
														bureauReport.oldestDate
															.overAllTotalCardWithInTATPercentage}{' '}
													%
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													Overall data outside TAT %
												</TableCell>
												<TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
													{bureauReport &&
														bureauReport.oldestDate
															.overAllTotalCardOutsideTATPercentage}{' '}
													%
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
							<Grid xs={12} sm={12}>
								<TableContainer component={Paper}>
									<Table stickyHeader aria-label="bureau report list">
										<TableHead>
											<TableRow>
												<TableCell />
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>{d}</TableCell>
													))}
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell>Total Count Allocated</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{
																bureauReport.oldestDate.TATWiseGroup[d]
																	.TotalCountAllocated
															}
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Count Dispatched</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{bureauReport.oldestDate.TATWiseGroup[d].countDispatched}
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Count Pending</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{bureauReport.oldestDate.TATWiseGroup[d].countPending}
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Beyond TAT</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell d={index}>
															{bureauReport.oldestDate.TATWiseGroup[d].beyondTAT}
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Within TAT</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{bureauReport.oldestDate.TATWiseGroup[d].withinTAT}
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Beyond TAT %</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{
																bureauReport.oldestDate.TATWiseGroup[d]
																	.beyondTATPercentage
															}{' '}
															%
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Overall % within TAT</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{
																bureauReport.oldestDate.TATWiseGroup[d]
																	.overallPercentageWithinTAT
															}{' '}
															%
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Outof TAT (Today)</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{
																bureauReport.oldestDate.TATWiseGroup[d]
																	.willBeOutsideTATToday
															}
														</TableCell>
													))}
											</TableRow>
											<TableRow>
												<TableCell>Outof TAT (Tommorow)</TableCell>
												{bureauReport &&
													bureauReport.oldestDate.TATDateLIST.map((d, index) => (
														<TableCell key={index}>
															{
																bureauReport.oldestDate.TATWiseGroup[d]
																	.willBeOutsideTATTommorow
															}
														</TableCell>
													))}
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
						</Grid>
					</Box>
				</Card>
			</Container>
		</>
	);
}
