import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Link, useLocation } from 'react-router-dom';

const ChildRouteItems = (props) => {
    const { drawerOpen, route } = props;
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const location = useLocation();

    const handleCollapseClick = () => {
        setCollapseOpen(!collapseOpen);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleCollapseClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={route.label} />
                {collapseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {
                route.childRoutes.map((childRoute, childIndex) => {
                    if (childRoute.hidden) return <React.Fragment key={childIndex}></React.Fragment>
                    return <Collapse in={collapseOpen} timeout="auto" key={childIndex} unmountOnExit>
                        <List component="div" disablePadding
                            sx={{
                                display: 'block',
                                backgroundColor: location.pathname === childRoute.path ? childRoute.selectedBgColor : childRoute.deafultBgColor
                            }}
                        >
                            <ListItemButton
                                LinkComponent={Link}
                                to={childRoute.path}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: drawerOpen ? 'initial' : 'center',
                                    px: 2.5,
                                    pl: 4
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: drawerOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={childRoute.label} sx={{ opacity: drawerOpen ? 1 : 0, color: location.pathname === childRoute.path ? childRoute.selectedColor : childRoute.defaultColor }} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                })
            }
        </React.Fragment>
    )
}

export default ChildRouteItems;