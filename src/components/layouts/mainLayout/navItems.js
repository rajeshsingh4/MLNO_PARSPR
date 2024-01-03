import { v4 as uuid } from 'uuid';
// Icons
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

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

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'Dashboard',
		Icon: BarChartOutlinedIcon,
		href: '/dashboards/dashboard1',
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Bureau',
		Icon: GridViewOutlinedIcon,
		menuChildren: [
			{
				title: 'Pending Report',
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
		type: 'group',
		title: 'Bank Pull Request',
		Icon: InventoryOutlinedIcon,
		menuChildren: [
			{
				title: 'Dashboard',
				href: '/bank/pull/dashboard',
			},
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
		],
	},
	{
		id: uuid(),
		type: 'group',
		title: 'Bureau Pull Request',
		Icon: AutoStoriesOutlinedIcon,
		menuChildren: [
			{
				title: 'Dashboard',
				href: '/bureau/pull/dashboard',
			},
			{
				title: 'Create',
				href: '/bureau/pull/create',
			},
			{
				title: 'Manage',
				href: '/bureau/pull/list',
			},
		],
	},
	{
		id: uuid(),
		type: 'item',
		title: 'Profile',
		Icon: AccountCircleOutlinedIcon,
		href: '/profile',
	},
];

export default NAV_LINKS_CONFIG;
