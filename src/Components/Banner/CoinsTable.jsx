import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../../Config/api'
import { Cryptostate } from '../../Cryptocontext'
import "../Banner/index.css"
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {

    function PriceCutter(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { currency, symbol } = Cryptostate()
    const [page, setPage] = useState(1)

    const FetchData = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }


    useEffect(() => {
        FetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin?.name.toLowerCase().includes(search) ||
            coin?.symbol.toLowerCase().includes(search)
        )
    }




    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Typography variant='h4' style={{ margin: "18px", fontFamily: "Montserrat" }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a Crypto Currency..." variant='outlined' style={{ marginBottom: 20, width: "100%" }} onChange={(e) => setSearch(e.target.value)} />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    {
                                        ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell style={{
                                                color: "black",
                                                fontFamily: "Montserrat",
                                                fontWeight: "700"
                                            }} key={head} align={head === "Coin" ? "" : "right"}>
                                                {head}
                                            </TableCell>
                                        ))
                                    }
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearch()
                                            ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                                            ?.map((row) => {
                                                let profit = row?.price_change_percentage_24h >= 0
                                                return (
                                                    <TableRow onClick={() => navigate(`coins/${row.id}`)} key={row.name} className='t-hover' style={{
                                                        cursor: 'pointer', backgroundColor: "#16171a", fontFamily: "Montserrat",
                                                    }}>
                                                        <TableCell component='th' scope='row' style={{ display: 'flex', gap: "15px" }}>
                                                            <img src={row?.image} alt={row.name} style={{ marginBottom: 10 }} height='50px' />
                                                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                                                <span style={{ textTransform: 'uppercase', fontSize: "22px" }}>
                                                                    {row?.symbol}
                                                                </span>
                                                                <span style={{ color: "darkgrey" }}>
                                                                    {row?.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='right'  >
                                                            {symbol} {PriceCutter(row?.current_price.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell
                                                            align='right'
                                                            style={{
                                                                color: profit > 0 ? "rgb(14,203,149)" : "red",
                                                                fontWeight: "500"
                                                            }}>
                                                            {profit && "+"} {row?.price_change_percentage_24h?.toFixed(2)}%
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            {symbol} {PriceCutter(row?.market_cap.toString().slice(0, -6))}M
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })

                                    }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                    count={(handleSearch()?.length / 10)}
                    style={{
                        padding: '20px',
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    onChange={(_, value) => {
                        setPage(value)
                        window.scroll(0, 450)
                    }}
                />
            </Container>

        </ThemeProvider>
    )
}

export default CoinsTable