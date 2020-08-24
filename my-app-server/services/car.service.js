const JsonData = require("../cars.json");

function getFilteredCars(filter) {
    let tempArr = [];
  
    if (!filter.year && !filter.color && !filter.carType) {
      return JsonData;
    } else {
      JsonData.map((car) => {
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

  module.exports = {
      getFilteredCars
  }