import { Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../../Components/CoinInfo'
import { SingleCoin } from '../../Config/api'
import { Cryptostate } from '../../Cryptocontext'
import "./index.css"
import LinearProgress from '@mui/material/LinearProgress';
import { doc, setDoc } from '@firebase/firestore'
import { db } from '../../Firebase'




const Coinpage = () => {

  const [data, setData] = useState([])
  const { id } = useParams()
  const { currency, symbol, user, watchlist, setAlert } = Cryptostate()
  const [loading, setLoading] = useState(false)

  function PriceCutter(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const GetSingleItem = async () => {
    setLoading(true)
    const { data } = await axios.get(SingleCoin(id))
    setData(data)
    setLoading(false)
  }

  // console.log(loading)
  useEffect(() => {
    GetSingleItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const inWatchlist = watchlist.includes(data?.id)

  const AddToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user?.uid)
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, data?.id] : [data?.id]
      })
      setAlert({
        open: true,
        message: `${data?.name} is added to watchlist`,
        type: 'success'
      })
    }
    catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: 'error',
      })
    }
  }

  const RemoveFromWatchlist = async () => {

    const coinRef = doc(db, "watchlist", user?.uid)

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch) => watch !== data?.id)
      },
        {
          merge: 'true'
        }
      )
      setAlert({
        open: true,
        message: `${data?.name} is Removed from watchlist`,
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


  if (loading) return <LinearProgress style={{ backgroundColor: "gold" }} />

  return (
    <div className="container" >
      {
        <div className="sidebar">
          <img src={data?.image?.large} alt={data?.name} height='200' style={{ marginBottom: '20px' }} />
          <Typography variant='h3'>
            {data?.name}
          </Typography>
          <Typography variant="subtitle1" className='description'>
            {
              (data?.description?.en.slice(0, 250))
            }
          </Typography>
          <div className="market-data">
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                Rank:
              </Typography>&nbsp;&nbsp;
              <Typography variant='h6' >
                {data?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                CurrentPrice :
              </Typography>&nbsp;&nbsp;
              <Typography variant='h6' >
                {symbol} {' '}{PriceCutter(data?.market_data?.current_price[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                Market Cap :
              </Typography>&nbsp;&nbsp;
              <Typography variant='h6'  >
                {symbol}{" "}{PriceCutter(data?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
              </Typography>
            </span>
            <span style={{
              margin: '0',
              marginBottom: '10px'
            }}>
              {
                user && (
                  <Button onClick={inWatchlist ? RemoveFromWatchlist : AddToWatchlist}
                    variant='contained'
                    fullWidth
                    style={{
                      backgroundColor: inWatchlist ? 'red' : '#EEBC1D',
                      color: 'black',
                      marginTop: '1rem',
                    }}
                  >
                    {inWatchlist ? "Remove from Watchlist" : "Add To Watchlist"}
                  </Button>
                )
              }
            </span>
          </div>
        </div>
      }
      <CoinInfo data={data} />
    </div>
  )
}

export default Coinpage