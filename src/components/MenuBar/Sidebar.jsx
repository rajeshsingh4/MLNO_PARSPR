import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES_LIST } from '../../common/routes';
import ChildRouteItems from './ChildRouteItems';

const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: 0,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = (props) => {
    const { drawerOpen } = props;

    const location = useLocation();

    return (
        <Drawer variant="permanent" open={drawerOpen}>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {ROUTES_LIST.map((route, index) => {
                        if (route.hidden) return <React.Fragment key={index}></React.Fragment>;
                        if (route.childRoutes && route.childRoutes.length > 0) {
                            return <ChildRouteItems key={index} drawerOpen={drawerOpen} route={route} />
                        }
                        return <React.Fragment key={index}>
                            <ListItem disablePadding
                                sx={{
                                    display: 'block',
                                    backgroundColor: location.pathname === route.path ? route.selectedBgColor : route.deafultBgColor
                                }}
                            >
                                <ListItemButton
                                    LinkComponent={Link}
                                    to={route.path}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: drawerOpen ? 'initial' : 'center',
                                        px: 2.5
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: drawerOpen ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={route.label} sx={{ opacity: drawerOpen ? 1 : 0, color: location.pathname === route.path ? route.selectedColor : route.defaultColor }} />
                                </ListItemButton>
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    })}
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar;