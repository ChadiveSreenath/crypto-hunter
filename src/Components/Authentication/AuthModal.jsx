import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#424242',
    width: 400,
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <div>
            <Button onClick={handleOpen} variant='contained' style={{
                width: '85',
                height: '40',
                backgroundColor: '#EEBC1D'
            }}>Login</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 300,
                    },
                }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant='fullWidth'
                            style={{ borderRadius: '10' }}
                        >
                            <Tab label="Login"></Tab>
                            <Tab label="Sign Up"></Tab>
                        </Tabs>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}