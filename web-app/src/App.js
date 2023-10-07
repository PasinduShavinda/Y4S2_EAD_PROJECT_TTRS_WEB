import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/UserManagement/Home';
import Login from './components/UserManagement/Login/Login';
import Register from './components/UserManagement/Registration/Register';
import TMHome from './components/UserManagement/TravellerManagement/TMHome';
import TMCreateProfile from './components/UserManagement/TravellerManagement/TMCreateProfile';
import TMViewProfiles from './components/UserManagement/TravellerManagement/TMViewProfiles';
import TMActiveDetactiveProfiles from './components/UserManagement/TravellerManagement/TMActiveDeactiveProfile';
import TMTravellerRegister from './components/UserManagement/TravellerManagement/TMTravellerRegister';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}></Route>

        {/* Login Registration Routes */}
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

        {/* Traveller Management Routes - Common */}
        <Route path='/TMHome' element={<TMHome/>}></Route>

        {/* Traveller Management Routes - Travel Agent */}
        <Route path='/TMCreateProfile' element={<TMCreateProfile/>}></Route>
        <Route path='/TMViewProfiles' element={<TMViewProfiles/>}></Route>
        <Route path='/TMRegTraveller' element={<TMTravellerRegister/>}></Route>
        
        {/* Traveller Management Routes - Back Officer */}
        <Route path='/TMactiveDeactiveProfiles' element={<TMActiveDetactiveProfiles/>}></Route>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
