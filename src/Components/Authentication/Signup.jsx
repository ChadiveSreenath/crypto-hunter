import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Cryptostate } from '../../Cryptocontext'
import { auth } from '../../Firebase'

const Signup = ({ handleClose }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { setAlert } = Cryptostate()


    const handleSubmit = async () => {

        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: "Passwords don't match",
                type: 'error'
            })
            return
        }


        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            setAlert({
                open: true,
                message: `Signup successful welcome ${result?.user?.email}`,
                type: 'success'
            })

            handleClose()
        }
        catch (e) {
            setAlert({
                open: true,
                message: `${e?.message}`,
                type: 'error'
            })
            return
        }
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
            <TextField
                variant='outlined'
                type="password"
                label="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant='outlined'
                style={{ backgroundColor: '#EEBC1D', color: 'black' }}
                size='large'
                onClick={handleSubmit}
            >
                Signup
            </Button>
        </Box>
    )
}

export default Signup