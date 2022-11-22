import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import LeaderList from "./pages/LeaderList";
import  AddLea  from "./pages/AddTeamLeader";

import AddTech from "./pages/AddTechnician";
import TechList from "./pages/TechniciansList";
import Location from "./pages/Location";
import Resource from "./pages/AddResource";
import Sales from "./pages/Sales";
import { Contact } from "./components/contact";
import Sample from "./pages/LandingPage";
import CreateSale from "./pages/CreatePOS";
import Login from "./pages/Login";
import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Routes,Router } from 'react-router-dom';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import axios from "axios";
// import { Provider } from 'react-redux';
import { Provider } from 'react-redux';
import store from "./config/redux/store";
import  Testdropdown  from "./pages/testdropdown";

let nodejsip ="http://67.205.163.34:8000"

///user login details saving in session or localstorage
// sessionStorage.setItem('userID', '1');
// sessionStorage.setItem('userTYPE', 'teamleader');
// sessionStorage.setItem('isLogin', 'true');
// sessionStorage.setItem('manageZones', 'false');
// sessionStorage.setItem('manageSubZones', 'true');
// sessionStorage.setItem('manageTerminals', 'true');
// sessionStorage.setItem('assignOrUpdateTeamleaderOnZone', 'True');
// sessionStorage.setItem('View', 'True');
// sessionStorage.setItem('isLogin', 'True');
// sessionStorage.setItem('nodeip', 'localhost:8000');
  
// console.log(sessionStorage.getItem('assignOrUpdateTeamleaderOnZone'),"pppppppppppppppppppppppp")


  // let nodejsip ="http://67.205.163.34:8000"
  // let myurl = nodejsip+"/users/get_permissions"
  // var data=[""];
  // axios
  //   .get(myurl)
  //   .then((res) => {
  //      data = res.data.myData;
  //     console.log("permission_data:",data[0]["type"])

  //     console.log("permission_data:",data[0]["manageZones"])
  //     console.log("permission_data:",data[0]["manageSubzones"])
  //     console.log("permission_data:",data[0]["manageTerminals"])

  //     sessionStorage.setItem('manageZones', data[0]["manageZones"]);
  //     sessionStorage.setItem('manageSubZones', data[0]["manageSubzones"]);
  //     sessionStorage.setItem('manageTerminals', data[0]["manageTerminals"]);
  //     // setCities(res.data.myData)
  //   })
  //   .catch((err) => console.log(err));


// const USER_ID = sessionStorage.getItem('userID');

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
  
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [login, setlogin] = React.useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("authenticated") == 'true') {
      setlogin(sessionStorage.getItem("authenticated"))
      setLandingPageData(JsonData);
    }
    else{
      setlogin(false)
    }
    


    
  }, []);
if (login == 'true'){
console.log("login checked",login)

  return (
    
<Router>
      {/* <Fragment> */}
      <Provider store={store}>
    <Routes>
      <Route exact path="/" element={<Sample/> } />
      
      <Route exact path="/leaderlist" element={<LeaderList/> } />
      <Route exact path="/addteamleader" element={<AddLea/> } />
      <Route exact path="/addtech" element={<AddTech/> } />
      <Route exact path="/techlist" element={<TechList/> } />
      <Route exact path="/location" element={<Location/> } />
      <Route exact path="/sales" element={<Sales/> } />
      <Route exact path="/createsale" element={<CreateSale/> } />
      <Route exact path="/resource" element={<Resource/> } />

      <Route exact path="/testdropdown" element={<Testdropdown/> } />
      
      <Route exact path="/login" element={<Login/>}/>

       
      
      {/* <Route exact path="/ab" element={<Ab/> } /> */}
    </Routes>
    </Provider>
    {/* </Fragment> */}
</Router>


  );

}
else{
  
  return (
    
    <Router>
          {/* <Fragment> */}
          <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Login/> } />
          
          <Route exact path="/leaderlist" element={<Login/> } />
          <Route exact path="/addteamleader" element={<Login/> } />
          <Route exact path="/addtech" element={<Login/> } />
          <Route exact path="/techlist" element={<Login/> } />
          <Route exact path="/location" element={<Login/> } />
          <Route exact path="/sales" element={<Login/> } />
          <Route exact path="/createsale" element={<Login/> } />
          <Route exact path="/resource" element={<Login/> } />
    
          <Route exact path="/testdropdown" element={<Login/> } />
          
          <Route exact path="/login" element={<Login/>}/>
    
           
          
          {/* <Route exact path="/ab" element={<Ab/> } /> */}
        </Routes>
        </Provider>
        {/* </Fragment> */}
    </Router>
    
    
      );




}
};

export default App;
