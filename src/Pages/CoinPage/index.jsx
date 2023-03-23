import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../../Components/CoinInfo'
import { SingleCoin } from '../../Config/api'
import { Cryptostate } from '../../Cryptocontext'
import "./index.css"
import LinearProgress from '@mui/material/LinearProgress';




const Coinpage = () => {

  const [data, setData] = useState([])
  const { id } = useParams()
  const { currency, symbol } = Cryptostate()
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
          </div>
        </div>
      }
      <CoinInfo data={data} />
    </div>
  )
}

export default Coinpage