const express = require('express');
const app = express();
const JsonData = require('../cars.json');
const userContext  = require("./../middlwares/userContext.middlware");
const authMiddlware = require("./../middlwares/auth.middlware");

function getFilteredCars(filter) {
    
    let tempArr=[];

    if (!filter.year && !filter.color && !filter.carType) {
        return JsonData;
    } else {
        JsonData.map(car => {

            if (filter.year) {
                if (car.year != Number(filter.year)) {
                    return;
                }
            }
        
            if (filter.color) {
                if (car.color.toLowerCase() != filter.color.toLowerCase()) {
                    return;
                }
            }
        
        
            if (filter.carType) {
                if (car.name.toLowerCase() != filter.carType.toLowerCase()) {
                    return;
                }
            }
        
            tempArr.push(car);
        
        
        });
        return tempArr;
    }



}

app.get('/carData',userContext, function (req, res,next) {

    try {
        const filter = {
            carType: req.query.carType,
            color: req.query.color,
            year: req.query.year,
        }

        let cars = getFilteredCars(filter); //2

        return res.status(200).json({ cars: cars });

    } catch (error) {
        return res.status(500).json({ msg: "internal server error" });
    }

});




module.exports = app;