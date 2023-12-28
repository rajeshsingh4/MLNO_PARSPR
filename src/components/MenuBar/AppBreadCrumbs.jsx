import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
    Link as RouterLink,
    useLocation,
} from 'react-router-dom';
import { breadcrumbNameMap } from '../../common/constants';

function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
}

const AppBreadCrumbs = (props) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumbs component='div' aria-label="breadcrumb" sx={{ pb: 2 }}>
            <LinkRouter underline="hover" color="inherit" to="/">
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                let to = `/${pathnames.slice(0, index + 1).join('/')}`;

                if (last && !breadcrumbNameMap[to]) {
                    const tempTo = to.split('/');
                    tempTo.splice(tempTo.length - 1);
                    to = `${tempTo.join('/')}/:id`;
                }

                return last ? (
                    <Typography color="text.primary" key={to}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
}

export default AppBreadCrumbs;