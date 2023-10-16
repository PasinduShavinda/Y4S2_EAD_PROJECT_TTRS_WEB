import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/UserManagement/Home';
import Login from './components/UserManagement/Login/Login';
import Register from './components/UserManagement/Registration/Register';
import TMHome from './components/UserManagement/TravellerManagement/TMHome';
import TMCreateProfile from './components/UserManagement/TravellerManagement/TMCreateProfile';
import TMViewProfiles from './components/UserManagement/TravellerManagement/TMViewProfiles';
import TMActiveDetactiveProfiles from './components/UserManagement/TravellerManagement/TMActiveDeactiveProfile';
import TMTravellerRegister from './components/UserManagement/TravellerManagement/TMTravellerRegister';
import TMViewRegisteredAcc from './components/UserManagement/TravellerManagement/TMViewRegisteredAcc';
// import Navbar from './components/Common/NavBar/Navbar';

import Homepage from "./components/HomePage/Homepage";
import TrainList from "./components/TrainManagement/TrainList/TrainList";
import CreateTrain from "./components/TrainManagement/CreateTrain/CreateTrain";
import AdminPage from "./components/AdminPage/AdminPage";
import TrainSheduls from "./components/TrainManagement/Shedule train/TrainSheduls"
import ReservationSearch from "./components/ReservationManagement/ReservationSearch"
import ReservaionListforUser from "./components/ReservationManagement/ReservaionListforUser/ReservaionListforUser"

import BackOfficerMain from "./components/MainComponent/BackOfficerMain";
import TravelAgentMain from "./components/MainComponent/TravelAgentMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>

        <Route path="/" element={< Homepage />} exact />
       
        <Route path="/CreateTrain" element={< CreateTrain />} exact />
        <Route path="/Trainlist" element={< TrainList />} exact />
        <Route path="/admin" element={< AdminPage />} exact />
        <Route path="/shedule/:id" element={< TrainSheduls />} exact />
        <Route path="/reservationserch" element={< ReservationSearch />} exact />
        <Route path="/reservationsUser" element={< ReservaionListforUser />} exact />
        <Route path='/shvHome' element={<Home/>}></Route>

        {/* Login Registration Routes */}
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

        {/* Traveller Management Routes - Common */}
        <Route path='/TMHome' element={<TMHome/>}></Route>

        {/* Traveller Management Routes - Travel Agent */}
        <Route path='/TMCreateProfile' element={<TMCreateProfile/>}></Route>
        <Route path='/TMViewProfiles' element={<TMViewProfiles/>}></Route>
        <Route path='/TMRegTraveller' element={<TMTravellerRegister/>}></Route>
        <Route path='/TMViewTravellerAccs' element={<TMViewRegisteredAcc/>}></Route>
        
        {/* Traveller Management Routes - Back Officer */}
        <Route path='/TMactiveDeactiveProfiles' element={<TMActiveDetactiveProfiles/>}></Route>

        <Route path='/BackOfficerMainPage' element={<BackOfficerMain/>}></Route>
        <Route path='/TravelAgentMainPage' element={<TravelAgentMain/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
