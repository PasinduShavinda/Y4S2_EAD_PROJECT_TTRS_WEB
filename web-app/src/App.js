import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./components/HomePage/Homepage";
import TrainList from "./components/TrainManagement/TrainList/TrainList";
import CreateTrain from "./components/TrainManagement/CreateTrain/CreateTrain";
import AdminPage from "./components/AdminPage/AdminPage";
import TrainSheduls from "./components/TrainManagement/Shedule train/TrainSheduls"
import ReservationSearch from "./components/ReservationManagement/ReservationSearch"
function App() {
  return (
    <div className="App">
        <React.Fragment>
    
        <Routes>
        <Route path="/" element={< Homepage />} exact />
        <Route path="/CreateTrain" element={< CreateTrain />} exact />
        <Route path="/Trainlist" element={< TrainList />} exact />
        <Route path="/admin" element={< AdminPage />} exact />
        <Route path="/shedule/:id" element={< TrainSheduls />} exact />
        <Route path="/reservationserch" element={< ReservationSearch />} exact />
        </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
