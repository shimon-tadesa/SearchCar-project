import React from 'react';
import "./searchCar.css";


const carTypes = [
    "Mazda",
    "Micubisi",
    "Honda",
    "Ford",
    "Seat",
    "Skoda",
];

const carColors = ["Red", "Black", "White", "Blue"];
let carsYears = [];


for (let i = 100; i < 121; i++) {
    carsYears.push((1900 + i));
    
}

let filter = {};


function Search(props) {
    
    function changeSelect(e) {
        let element = e.target;
        filter[element.id] = element.selectedOptions[0].value;
        props.onSelctBoxChange(filter);
    }

    function clearSelect() {
        console.log('select is clear');
        document.getElementById("carType").selectedIndex=null;
        document.getElementById("year").selectedIndex = null;
        document.getElementById("color").selectedIndex = null;
       filter = {};
       props.onSelctBoxChange(filter);
       
    }

  

    return (
        <div className="search">
            <select id="carType" className="select-box"  defaultValue={'DEFAULT'} onChange={changeSelect}>
                <option disabled value="DEFAULT" >Select Type</option>
                {carTypes.map((carType, index) => (
                    <option value={carType} key={index}>{carType}</option>
                ))}
            </select>

            <select id="year" className="select-box"  defaultValue={'DEFAULT'}  onChange={changeSelect} >
                <option disabled value="DEFAULT">Select Year</option>
                {carsYears.map((year, index) => (
                    <option value={year} key={index} >{year}</option>
                ))}
            </select>

            <select id="color" className="select-box"  defaultValue={'DEFAULT'} onChange={changeSelect}>
                <option disabled value="DEFAULT">Select Color</option>
                {carColors.map((color, index) => (
                    <option value={color} key={index}>{color}</option>
                ))}
            </select>
            <button onClick={clearSelect} id="clearButton">Clear</button>
        </div>
    )
}

export default Search;