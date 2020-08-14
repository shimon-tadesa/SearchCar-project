require("../server.js"); 
const axios = require('axios');
var assert = require('assert');
 
describe('Array', function () {
    it('test get car data for home page (return all cars) ', async () => {
      
           const  response = await axios.get('http://localhost:9091/carData');       
            assert.equal(response.data.cars.length,18,"car length should be 18!");        
            // assert.equal(response.status,200,"bad response expected 200!")
     
    });



});