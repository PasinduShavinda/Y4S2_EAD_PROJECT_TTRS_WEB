import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
          let loginObject = {
            "email": email,
            "password": password
          };
          fetch("https://localhost:7084/api/v1/authenticate/login", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(loginObject)
          }).then((res) => {
            return res.json();
          }).then((resp) => {
            console.log(resp)
            if (Object.keys(resp).length === 0) {
              swal("Login Failed!", "Invalid Credentials ❌ 🚫 ", "error");
            } else {
              swal("Successful!", "Login Successful ✅ 👏", "success");
              sessionStorage.setItem('email', resp.email);
              sessionStorage.setItem('role', resp.role);
              sessionStorage.setItem('accessToken', resp.accessToken);
      
              // Check the user's role and navigate accordingly
              if (resp.role === 'TRAVEL_AGENT') {
                usenavigate('/TMHome');
              } else if (resp.role === 'BACK_OFFICER') {
                usenavigate('/TMactiveDeactiveProfiles');
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