require("../server.js"); 
const axios = require('axios');
var assert = require('assert');
 
describe('Array', function () {
    it('test get car data for home page (return all cars) ', async () => {
      
           const  response = await axios.get('http://localhost:9091/api/car/carData');       
            assert.equal(response.data.cars.length,20,"car length should be 20!");        
            // assert.equal(response.status,200,"bad response expected 200!")
     
    });



});