// requires
const _ = require('lodash');
const path = require("path");
 
 

// module variables
const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

let mergedConfig = _.merge(defaultConfig, environmentConfig);

// todo should loop through variables sent and if exist on config ovveride with them
if(process.env.DB_HOST){
    //for production 
    mergedConfig.dbHost = process.env.DB_HOST ;
}

 
 

const finalConfig = mergedConfig;

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, 2)}`);