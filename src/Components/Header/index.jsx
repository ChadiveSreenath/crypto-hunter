import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import React from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom'
import { Cryptostate } from '../../Cryptocontext'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Header = () => {
    const navigate = useNavigate()

    const { currency, setCurrency } = Cryptostate()

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position='static'>
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => {
                                navigate("/")
                            }}
                            variant='h6'
                            className='title'
                        >
                            Crypto Hunter
                        </Typography>
                        <Select variant='outlined'
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="INR">INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header