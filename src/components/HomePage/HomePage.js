import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import vehicleData from '../../fakeData/fakeData.json'

const HomePage = () => {
    const [vehicle, setVehicle] = useState([])
    useEffect(() => {
        setVehicle(vehicleData)

    }, [])
    return (
        <div>
          
            {
                vehicle.map(vh => <Header details={vh}></Header>)
            }

        </div>
    );
};

export default HomePage;