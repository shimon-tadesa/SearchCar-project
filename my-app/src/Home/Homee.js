import React, { useState, useEffect } from 'react';
import './Home.css';
import Search from '../SearcahCar/SearchCar';
import axios from 'axios';

function Home() {
    const [displaydCars, setDisplaydCars] = useState([]);
    const [carTitle, seCarTitle] = useState("Car Collection");

    // called when select box is changed
    function onFilterChange(filter) {
        loadCarData(filter); //filter is now empty so the return data from server is jsonData//1  
    }

    function loadCarData(filter) {
        var url = new URL(window.location.origin + '/api/car/carData');
        Object.keys(filter).forEach(key => url.searchParams.append(key, filter[key]));


        axios.get(url).then(res => {
            let carData = res.data;
            setDisplaydCars(carData.cars);
            let carTitle = carData.cars.length > 0 ? "Car Collection" : "The vehicle is sold or not in the System";
            seCarTitle(carTitle);
        }).catch(function (error) {
            console.log("bad!!")
        });


    }

    useEffect(() => {
        loadCarData({});

    }, [])


    return (
        <div className="Home">
            <h1>Find Your Car</h1>
            <Search onSelctBoxChange={onFilterChange} />
            <h3 id="header">{carTitle}</h3>
            {
                displaydCars.map((car, index) => (
                    <div className="car-boxx" key={index} >
                        <img src={car.img} alt="some car"/>
                        <p id="car-text">{car.name} {car.year} {car.color}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
