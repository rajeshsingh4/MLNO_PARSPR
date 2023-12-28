import React from 'react';
import CardTrackingService from '../../services/card.service';
import SkeletonLoader from '../../common/SkeletonLoader';
import MUIDataTable from 'mui-datatables';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CreatePullRequestForm from './CreatePullRequestForm';

const CreatePullRequestList = (props) => {
    const [cardList, setCardList] = React.useState([]);
    const [cardListLoader, setCardListLoader] = React.useState(false);
    const [cardListError, setCardListError] = React.useState(false);
    const [pullRequestModal, setPullRequestModal] = React.useState({ open: false, rowData: null, tableMeta: null });

    const getCardListForPullRequest = async () => {
        setCardListLoader(true);
        try {
            const cardDetails = await CardTrackingService.getAllCardsWithFileDeatils('bank=HDFC');
            setCardList(cardDetails.data);
        } catch (err) {
            console.error("Error fetching list of cards for creating pull-request ", err);
            setCardListError(true);
        } finally {
            setCardListLoader(false);
        }
    };

    React.useEffect(() => {
        getCardListForPullRequest();
    }, []);

    const createPullRequest = (tableMeta) => {
        setPullRequestModal({ open: true, rowData: tableMeta.rowData, tableMeta });
    }

    const handleClose = () => {
        setPullRequestModal({ open: false, rowData: null, tableMeta: null });
    };

    const getColumnMapping = (row) => {
        let fieldList = [];
        let listKey = Object.keys(row);

        let fieldToShow = ['trackingId', 'Bank', 'AWB_No', 'Product', 'Logo', 'PA_Flag', 'NRWC_Flag', 'Bureau_Total_TAT_Days', 'Bureau_TAT_Extra_Days_Passed', 'Bureau_Status', 'Courier_Status', 'Courier_TAT_Extra_Days_Passed', 'fileMaster']

        listKey.forEach((key, i) => {
            let baseFieldObj = { name: listKey[i], label: listKey[i], options: { filter: true, print: false, viewColumns: true, display: (fieldToShow.includes(listKey[i]) ? true : 'excluded') } };
            if (listKey[i] === 'fileMaster') {
                baseFieldObj.name = "fileMaster.fileName";
                baseFieldObj.label = "File Name";
            }
            fieldList.push(baseFieldObj);
            if (i === (listKey.length - 1)) {
                baseFieldObj = {
                    name: 'Actions', label: 'Actions', options: {
                        filter: false,
                        sort: false,
                        print: false,
                        viewColumns: false,
                        customBodyRender: (value, tableMeta, updateValue) => (
                            <>
                                <IconButton aria-label="edit" value={value} data-custom={{ tableMeta, updateValue }} onClick={() => createPullRequest(tableMeta)}>
                                    <EditIcon />
                                </IconButton>
                            </>
                        )
                    }
                };
                fieldList.push(baseFieldObj);
            }
        })
        return fieldList;
    }

    if (cardListLoader) {
        return <SkeletonLoader count={20} />
    }

    if (cardListError) {
        return <>Error fetching card deatils for pull request....!!</>
    }

    return (
        <>
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
                    enableNestedDataAccess: ".",
                    rowsPerPage: 10,
                    rowsPerPageOptions: [10, 20, 50, 100],
                }}
            />
            {(pullRequestModal.open && pullRequestModal.rowData) && <CreatePullRequestForm handleClose={handleClose} pullRequestModal={pullRequestModal} />}
        </>
    )
}

export default CreatePullRequestList;