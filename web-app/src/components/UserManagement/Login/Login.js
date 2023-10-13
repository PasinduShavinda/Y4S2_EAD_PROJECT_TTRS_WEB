////////////////////////////////////////////////////////////////////////////////////////////////////////
// FileName: Login.js
// FileType: JavaScript File
// Author: IT20140298 Shavinda W.A.P
// Description: Login
////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
    // State variables to manage email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usenavigate = useNavigate();

    // useEffect to clear session storage when the component loads
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    // Function to handle the login process when the form is submitted
    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
          // Prepare the login object with email and password
          let loginObject = {
            "email": email,
            "password": password
          };
          // Send a POST request to the server for authentication
          fetch("http://localhost:5239/api/v1/authenticate/login", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(loginObject)
          }).then((res) => {
            return res.json();
          }).then((resp) => {
            console.log(resp)
            // Check if the response is empty (failed login) or has data (successful login)
            if (Object.keys(resp).length === 0) {
              swal("Login Failed!", "Invalid Credentials ❌ 🚫 ", "error");
            } else {
              // Display a success message and store user data in session storage
              swal("Successful!", "Login Successful ✅ 👏", "success");
              sessionStorage.setItem('email', resp.email);
              sessionStorage.setItem('role', resp.role);
              sessionStorage.setItem('accessToken', resp.accessToken);
      
              // Check the user's role and navigate accordingly
              if (resp.role === 'Travel Agent') {
                usenavigate('/TMViewTravellerAccs');
              } else if (resp.role === 'Back Officer') {
                usenavigate('/TMViewTravellerAccs');
              } else {
                // Handle other roles or navigate to a default route
                usenavigate('/');
              }
            }
          }).catch((err) => {
            console.log(err);
          });
        }
      }
    // Function to validate email and password
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            swal("Login Failed!", "Email cannot be empty ❗️❗️ ", "error");
        }
        if (password === '' || password === null) {
            result = false;
            swal("Login Failed!", "Password cannot be empty ❗️❗️ ", "error");
        }
        return result;
    }
    return (
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
    );
}

export default Login;