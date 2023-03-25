import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button, Divider } from '@mui/material';
import { Cryptostate } from '../../Cryptocontext';
import "./index.css";
import { signOut } from 'firebase/auth';
import { auth, db } from '../../Firebase';
import { AiFillDelete } from "react-icons/ai"
import { doc, setDoc } from '@firebase/firestore';


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

    const { user, setAlert, watchlist, coins, symbol } = Cryptostate()

    const handleOut = () => {
        signOut(auth)
        setAlert({
            open: true,
            message: 'Successfully Logged Out',
            type: 'success'
        })
        toggleDrawer()
    }

    function PriceCutter(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const removefromwatchlist = async (coin) => {

        const coinRef = doc(db, "watchlist", user?.uid)

        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin?.id)
            },
                {
                    merge: 'true'
                }
            )
            setAlert({
                open: true,
                message: `${coin?.name} is Removed from watchlist`,
                type: 'success'
            })
        }
        catch (err) {
            setAlert({
                open: true,
                message: err.message,
                type: 'error',
            })
        }

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
                                    {
                                        // eslint-disable-next-line
                                        coins?.map((coin) => {
                                            if (watchlist?.includes(coin?.id)) return (
                                                <>
                                                    <div className='watchlist-item'>
                                                        <span>
                                                            {coin?.name}
                                                        </span>
                                                        <span>
                                                            {symbol} {PriceCutter(coin?.current_price?.toFixed(2))}
                                                        </span>
                                                        <span>
                                                            <AiFillDelete onClick={() => removefromwatchlist(coin)} />
                                                        </span>
                                                    </div>
                                                </>

                                            )
                                        })
                                    }
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