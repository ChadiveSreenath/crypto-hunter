import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel'
import "./index.css"

const Banner = () => {
    return (
        <div className='bg-banner'>
            <Container className='banner-content'>
                <div className='tagline'>
                    <Typography
                        variant='h2'
                        style={{
                            fontWeight: "bold",
                            marginBottom: "15",
                            fontFamily: "Montserrat"
                        }}>
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color:"darkgrey",
                            textTransform:"capitalize",
                            fontFamily:"Montserrat"
                        }}  
                    >
                        Get All The Info Regarding Your Favorite Crypto Currencies
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner