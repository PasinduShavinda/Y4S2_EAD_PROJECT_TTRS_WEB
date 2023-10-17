////////////////////////////////////////////////////////////////////////////////////////////////////////
// FileName: Login.js
// FileType: JavaScript File
// Author: IT20140298 Shavinda W.A.P
// Description: Login
////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Footer from "../../Common/Footer/Footer";

const Login = () => {
  // State variables to manage email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usenavigate = useNavigate();

  // useEffect to clear session storage when the component loads
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      let loginObject = {
        email: email,
        password: password
      };
      fetch("http://localhost:5239/api/v1/authenticate/login", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(loginObject)
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((resp) => {
            // Successful login logic
            console.log(resp);
            swal("Successful!", "Login Successful ✅ 👏", "success");
            sessionStorage.setItem('email', resp.email);
            sessionStorage.setItem('role', resp.role);
            sessionStorage.setItem('accessToken', resp.accessToken);
            if (resp.role === 'Travel Agent') {
              usenavigate('/TravelAgentMainPage');
            } else if (resp.role === 'Back Officer') {
              usenavigate('/BackOfficerMainPage');
            } else {
              usenavigate('/login');
            }
          });
        } else if (res.status === 400) {
          return res.text().then((resp) => {
            // Check for the "Invalid email/password" message
            if (resp === "User Not Found") {
              swal("User Not Found", "The user is not registered ❗️", "error");
            } else if(resp === "Incorrect Password") {
              swal("Incorrect Password", "Please enter correct password ❗️", "error");
            } else {
              // Handle other error cases
              swal("Error", "An error occurred during login ❗️", "error");
            }
          });
        } else {
          // Handle other status codes
          swal("Error", "An error occurred during login ❗️", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  
  

  // Function to validate email and password
  const validate = () => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    let result = true;
    if (password === '' && email === '') {
      result = false;
      swal("Login Failed!", "Email and Password cannot be empty ❗️❗️ ", "error");
    }
    else if (password === '' || password === null) {
      result = false;
      swal("Login Failed!", "Password cannot be empty ❗️❗️ ", "error");
    }
    else if (email === '' || email === null) {
      result = false;
      swal("Login Failed!", "Email cannot be empty ❗️❗️ ", "error");
    } 
    else if (!email.match(emailRegex)) {
      result = false;
      swal("Login Failed!", "Please enter a valid email address ❗️❗️ ", "error");
    } 
    return result;
  }
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
          <form onSubmit={ProceedLogin} className="container">
            <div className="card">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Email <span className="errmsg">*</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                </div>
                <div className="form-group">
                  <label>Password <span className="errmsg">*</span></label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"></input>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Login</button>
                <br></br><br></br>
                <h7>Don't you have an account click </h7><a href="/register">sign up</a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;