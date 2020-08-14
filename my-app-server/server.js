const express = require('express');
const path = require('path');
const app = express();
const JsonData = require('./cars.json');

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


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});


app.get('/carData', function (req, res) {

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


app.listen(process.env.PORT || 9091, () => {
    console.log("server started at port : " + (process.env.PORT || 9091))
});