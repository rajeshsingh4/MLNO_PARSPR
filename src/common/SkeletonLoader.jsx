import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonLoader(props) {
    const skeletonLength = props.count || 10;
    return (
        <Box sx={{ width: '100%' }}>
            {
                Array.from({ length: skeletonLength }).map((item, index) => <Skeleton sx={{ mt: 1, mb: 1 }} key={index} animation='wave' />)
            }
        </Box>
    );
}