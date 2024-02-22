import { v4 as uuid } from 'uuid';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

export const BANK_NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'Dashboard',
		Icon: BarChartOutlinedIcon,
		href: '/bank/dashboard',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Bureau',
		Icon: GridViewOutlinedIcon,
		menuChildren: [
			{
				title: 'File Wise Report',
				href: '/bank/bureau/filewisereport',
			},
			{
				title: 'Comparision',
				href: 'bank/bureau/comparision',
			},
		],
	},
	{
		id: uuid(),
		type: 'item',
		title: 'MIS',
		Icon: InventoryOutlinedIcon,
		href: '/bank/mis',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Bank Pull Request',
		Icon: InventoryOutlinedIcon,
		menuChildren: [
			{
				title: 'Create',
				href: '/bank/pull/create',
			},
			{
				title: 'Manage',
				href: '/bank/pull/list',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'File',
		Icon: InventoryOutlinedIcon,
		menuChildren: [
			{
				title: 'File TAT Report',
				href: '/bank/bureau/filetatreport',
			},
			{
				title: 'Pending Report',
				href: '/bank/bureau/pending-report',
			},
		],
	},
];

export const BUREAU_NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'Dashboard',
		Icon: BarChartOutlinedIcon,
		href: '/bureau/dashboard',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'File',
		Icon: InventoryOutlinedIcon,
		menuChildren: [
			{
				title: 'File TAT Report',
				href: '/bureau/file/filetatreport',
			},
			{
				title: 'Pending Report',
				href: '/bureau/file/pending-report',
			},
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Bureau Pull Request',
		Icon: AutoStoriesOutlinedIcon,
		menuChildren: [
			{
				title: 'Cards List',
				href: '/bureau/pull/cards',
			},
			{
				title: 'Manage',
				href: '/bureau/pull/list',
			},
		],
	},
];

export const SUPERADMIN_NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'User List',
		Icon: BarChartOutlinedIcon,
		href: '/superadmin/dashboard',
	},
	{
		id: uuid(),
		type: 'item',
		title: 'File Upload',
		Icon: InventoryOutlinedIcon,
		href: '/superadmin/fileupload',
	},
];
