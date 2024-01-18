import React from 'react';
import Loader from '@/components/loader';
import MUIDataTable from 'mui-datatables';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/pageHeader';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardTrackingService from '@/utils/services/card.service';
import CreatePullRequestForm from './CreatePullRequestForm';

function BankCreatePullRequestList() {
	const [cardList, setCardList] = React.useState([]);
	const [cardListLoader, setCardListLoader] = React.useState(false);
	const [cardListError, setCardListError] = React.useState(false);
	const [pullRequestModal, setPullRequestModal] = React.useState({
		open: false,
		rowData: null,
		tableMeta: null,
		isEdit: false,
	});

	const getCardListForPullRequest = async () => {
		setCardListLoader(true);
		try {
			const cardDetails = await CardTrackingService.getAllCardsWithFileDeatils();
			setCardList(cardDetails.data);
		} catch (err) {
			console.error('Error fetching list of cards for creating pull-request ', err);
			setCardListError(true);
		} finally {
			setCardListLoader(false);
		}
	};

	React.useEffect(() => {
		getCardListForPullRequest();
	}, []);

	const createPullRequest = (tableMeta) => {
		setPullRequestModal({ open: true, rowData: tableMeta.rowData, tableMeta, isEdit: false });
	};

	const handleClose = () => {
		setPullRequestModal({ open: false, rowData: null, tableMeta: null, isEdit: false });
	};

	const getColumnMapping = (row) => {
		const fieldList = [];
		const listKey = Object.keys(row);

		const fieldToShow = [
			'trackingId',
			'Bank',
			'AWB_No',
			'Product',
			'Logo',
			'PA_Flag',
			'NRWC_Flag',
			'Bureau_Total_TAT_Days',
			'Bureau_TAT_Extra_Days_Passed',
			'Bureau_Status',
			'Courier_Status',
			'Courier_TAT_Extra_Days_Passed',
			'fileMaster',
		];

		listKey.forEach((key, i) => {
			let baseFieldObj = {
				name: listKey[i],
				label: listKey[i],
				options: {
					filter: true,
					print: false,
					viewColumns: true,
					display: fieldToShow.includes(listKey[i]) ? true : 'excluded',
				},
			};
			if (listKey[i] === 'fileMaster') {
				baseFieldObj.name = 'fileMaster.fileName';
				baseFieldObj.label = 'File Name';
			}
			fieldList.push(baseFieldObj);
			if (i === listKey.length - 1) {
				baseFieldObj = {
					name: 'Actions',
					label: 'Actions',
					options: {
						filter: false,
						sort: false,
						print: false,
						viewColumns: false,
						customBodyRender: (value, tableMeta, updateValue) => (
							<IconButton
								aria-label="edit"
								value={value}
								data-custom={{ tableMeta, updateValue }}
								onClick={() => createPullRequest(tableMeta)}
							>
								<EditIcon />
							</IconButton>
						),
					},
				};
				fieldList.push(baseFieldObj);
			}
		});
		return fieldList;
	};

	if (cardListLoader) {
		return (
			<Loader
				addSx={{
					mt: 5,
				}}
			/>
		);
	}

	if (cardListError) {
		return <>Error fetching card deatils for pull request....!!</>;
	}

	return (
		<>
			<PageHeader title="Create Pull Requests">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/">
						Dashboard
					</Link>
					<Typography color="text.tertiary">Bank</Typography>
					<Typography color="text.tertiary">Create Pull</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Container>
				<Card
					component="section"
					type="section"
					sx={{ '& > .create-pull-request-list': { boxShadow: 'none' } }}
				>
					<MUIDataTable
						// title="Name of Table"
						className="mui-data-table create-pull-request-list"
						data={cardList}
						columns={getColumnMapping(cardList[0] || [])}
						options={{
							filter: true,
							fixedHeader: true,
							filterType: 'dropdown',
							responsive: 'standard',
							print: false,
							selectableRows: 'none',
							enableNestedDataAccess: '.',
							rowsPerPage: 10,
							rowsPerPageOptions: [10, 20, 50, 100],
						}}
					/>
				</Card>
			</Container>
			{pullRequestModal.open && pullRequestModal.rowData && (
				<CreatePullRequestForm
					handleClose={handleClose}
					pullRequestModal={pullRequestModal}
					goBackTo="/bank/pull/list"
				/>
			)}
		</>
	);
}

export default BankCreatePullRequestList;
