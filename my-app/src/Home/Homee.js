import React, {useState, useEffect } from 'react';
import './Home.css';
import Search from '../SearcahCar/SearchCar';

function Home() {
    const [displaydCars, setDisplaydCars] = useState([]);
    const [carTitle,seCarTitle] = useState("Car Collection");

    // called when select box is changed
    function onFilterChange(filter) {
       loadCarData(filter); //filter is now empty so the return data from server is jsonData//1
       
    }

    function loadCarData(filter){
        var url = new URL("http://localhost:3000/carData");   

        Object.keys(filter).forEach(key => url.searchParams.append(key, filter[key]));

        fetch(url)
        .then(response => {
            if(response.ok){ 
            console.log("got response");
            response.json().then(carData=>{
                setDisplaydCars(carData.cars);
                let carTitle = carData.cars.length > 0 ?"Car Collection":"The vehicle is sold or not in the System";
                seCarTitle(carTitle); 
                
            });

        }
        else {
            console.log("bad!!")
        }
        });
    }
    
  useEffect(()=>{
     loadCarData({});
     
  },[])

    
    return (
        <div className="Home">
            <h1>Find Your Car</h1>
            <Search onSelctBoxChange={onFilterChange}/>
            <h3 id="header">{carTitle}</h3>
            { 
    displaydCars.map((car, index) => (
        <div className="car-boxx" key={index} >
            <img src={car.img} width="200px" height="200px" alt="some car" />
            <p id="car-text">{car.name} {car.year} {car.color}</p>
        </div>
    ))
            }
        </div>
    );
}

export default Home;
