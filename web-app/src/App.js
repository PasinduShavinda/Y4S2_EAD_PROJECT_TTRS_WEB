import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/UserManagement/Home';
import Login from './components/UserManagement/Login/Login';
import Register from './components/UserManagement/Registration/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        {/* <Route path='/customer' element={<Customer/>}></Route> */}
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
