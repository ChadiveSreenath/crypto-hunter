import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button, Divider } from '@mui/material';
import { Cryptostate } from '../../Cryptocontext';
import "./index.css";
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase';


export default function Sidebar() {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const { user, setAlert } = Cryptostate()

    const handleOut = () => {
        signOut(auth)
        setAlert({
            open: true,
            message: 'Successfully Logged Out',
            type: 'success'
        })
        toggleDrawer()
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#EEBC1D',
                            height: '38px',
                            width: '38px'
                        }}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className="profile-container">
                            <div >
                                <Avatar
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                    className="avatar-img"
                                />
                            </div>
                            <div className="email-text">
                                {
                                    user.displayName || user.email
                                }
                            </div>
                            <div className="watchlist-container">
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '10px',
                                    }}
                                >
                                    Watchlist
                                </div>
                                <Divider />
                                <div className="watchlist-content">

                                </div>
                            </div>
                        </div>
                        <div className="sign-out-container">
                            <Button
                                onClick={handleOut}
                                variant='contained'
                                style={{
                                    backgroundColor: '#EEBC1D',
                                    color: "black",
                                }}
                                fullWidth
                            >
                                LOGOUT
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}