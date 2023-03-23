import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from './Config/api'



const Crypto = createContext()

const Cryptocontext = ({ children }) => {

    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user,setUser] = useState(null)


    const FetchData = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }




    useEffect(() => {
        if (currency === "INR") setSymbol('₹')
        else if (currency === "USD") setSymbol('$')
    }, [currency])

    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, FetchData }}>
            {children}
        </Crypto.Provider>
    )
}

export default Cryptocontext

export const Cryptostate = () => {
    return useContext(Crypto)
}