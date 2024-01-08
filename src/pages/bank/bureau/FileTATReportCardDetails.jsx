import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export function FileTATReportCardDetails(props) {
	const { details } = props;
	const [fileList] = useState(details.cardData);

	if (!fileList || fileList.length === 0) {
		return <>There are no cards present</>;
	}

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
		];

		listKey.forEach((key) => {
			const baseFieldObj = {
				field: key,
				headerName: key.split('_').join(' '),
				description: key.split('_').join(' '), // shows as tooltip
				sortable: true,
				width: 200,
				editable: false,
			};
			if (fieldToShow.includes(key)) {
				fieldList.push(baseFieldObj);
			}
		});
		return fieldList;
	};

	return (
		<div style={{ width: '100%' }}>
			<DataGrid
				rows={fileList}
				columns={getColumnMapping(fileList[0])}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[10, 20, 50, 100]}
			/>
		</div>
	);
}
