import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert';
import React from 'react'
import { Cryptostate } from '../../Cryptocontext'

const AlertComponent = () => {

    const { alert, setAlert } = Cryptostate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ open: false });
    };

    return (
        <Snackbar open={alert.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                variant='filled'
                severity={alert.type}
                onClose={handleClose}
            >
                {alert.message}

            </Alert>
        </Snackbar>
    )
}

export default AlertComponent