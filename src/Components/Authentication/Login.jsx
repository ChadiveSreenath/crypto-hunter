import { Box, Button, TextField } from '@mui/material'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { Cryptostate } from '../../Cryptocontext'
import { auth } from '../../Firebase'

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAlert } = Cryptostate()

    const handleSubmit = async () => {

        if (!email || !password) {
            setAlert({
                open: true,
                message: 'please fill all the feilds',
                type: 'error'
            })
            return
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            setAlert({
                open: true,
                message: `login successfull ${result?.user?.email}`,
                type: 'success'
            })

            handleClose()
        }
        catch (e) {
            setAlert({
                open: true,
                message: e.message,
                type: 'error'
            })
            return
        }
    }

    const googleProvider = new GoogleAuthProvider()

    const googleLogin = () => {

        signInWithPopup(auth, googleProvider)
            .then((res) => {
                setAlert({
                    open: true,
                    message: `login successfull ${res?.user?.email}`,
                    type: 'success'
                })
                handleClose()
            })
            .catch((e) => {
                setAlert({
                    open: true,
                    message: e.message,
                    type: 'error'
                })
                return
            })
    }


    return (
        <Box p={2} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',

        }}>

            <TextField
                variant='outlined'
                type="email"
                label="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                variant='outlined'
                type="password"
                label="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant='outlined'
                style={{ backgroundColor: '#EEBC1D', color: 'black' }}
                size='large'
                onClick={handleSubmit}
            >
                Login
            </Button>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',

                }}
            >
                <span
                    style={{
                        textAlign: 'center',

                    }}
                >
                    OR
                </span>
                <GoogleButton
                    style={{
                        width: '100%',
                        outline: 'none',

                    }}
                    onClick={googleLogin}
                />
            </Box>

        </Box>
    )
}

export default Login