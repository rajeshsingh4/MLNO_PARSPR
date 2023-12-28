import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarMessage(props) {
    const { open, type, message, handleCloseSnackBar } = props;

    return (
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{  vertical: 'top', horizontal: 'right' }} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}