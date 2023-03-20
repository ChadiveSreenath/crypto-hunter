import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import Coinpage from '../CoinPage/index';
import Homepage from '../Homepage/index';


const NavigationRoutes = () => {

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/coins/:id" element={<Coinpage />} />
            </Routes>
        </div>
    )
}

export default NavigationRoutes