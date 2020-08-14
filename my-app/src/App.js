import React from 'react';
import Home from "./Home/Homee"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

function App(){
    return (
      <div className="App">
   
    
    <Router>
         
        <Switch>
          <Route exact  path="/" >
               <Home />
          </Route>
          
          <Route  exact  path="/404">
               404 page not found
          </Route>

          <Redirect to="/404">

          </Redirect>
           
          
        </Switch>
        
    </Router>


    
    
    </div>
  );
}


export default App;
