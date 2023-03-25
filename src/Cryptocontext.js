import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from './Config/api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './Firebase'
import { doc, onSnapshot } from '@firebase/firestore'



const Crypto = createContext()

const Cryptocontext = ({ children }) => {

    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        type: 'success',
    })

    const [watchlist, setWatchlist] = useState([])

    const FetchData = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }


    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user?.uid)
            var unsub = onSnapshot(coinRef, coin => {
                if (coin?.exists()) {
                    setWatchlist(coin?.data().coins)
                }
                else {
                    console.log("No coins in watchlist")
                }
            })
            return () => unsub()
        }
    }, [user])






    useEffect(() => {
        if (currency === "INR") setSymbol('₹')
        else if (currency === "USD") setSymbol('$')
    }, [currency])

    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, watchlist, setWatchlist, FetchData, alert, setAlert, user }}>
            {children}
        </Crypto.Provider>
    )
}

export default Cryptocontext

export const Cryptostate = () => {
    return useContext(Crypto)
}