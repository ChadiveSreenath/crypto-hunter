import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../Config/api'
import { Cryptostate } from '../../Cryptocontext'
import "./index.css"
import 'react-alice-carousel/lib/alice-carousel.css'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import axios from 'axios'



export function PriceCutter(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([])

    const { currency, symbol } = Cryptostate()

    const CoinsData = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }


    useEffect(() => {
        CoinsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])



    const items = trending?.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0
        return (
            <Link to={`coins/${coin?.id}`} className='carousel-items'>
                <img src={coin?.image} alt={coin?.name} height={80} style={{ marginBottom: 10 }} />
                <span>
                    {coin?.symbol} &nbsp;
                    <span style={{
                        color: profit > 0 ? "rgb(14,203,149)" : "red",
                        fontWeight: "500"
                    }}>
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: "22px", fontWeight: "500" }}>
                    {symbol} {PriceCutter(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })


    const responsive = {
        0: {
            items: 2
        },
        546: {
            items: 4
        }
    }

    return (
        <div className='carousel'>
            <AliceCarousel
                mouseTracking
                infinite
                disableButtonsControls
                disableDotsControls
                autoPlayInterval={1000}
                animationDuration={1500}
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel