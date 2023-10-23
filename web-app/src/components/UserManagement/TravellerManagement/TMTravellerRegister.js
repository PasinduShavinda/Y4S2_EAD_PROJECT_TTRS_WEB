////////////////////////////////////////////////////////////////////////////////////////////////////////
// FileName: TMTravellerRegister.js
// FileType: JavaScript File
// Author: IT20140298 Shavinda W.A.P
// Description: Traveller Registration page
////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Footer from '../../Common/Footer/Footer';
import Navbar from '../../Common/NavBar/Navbar';

const TMTravellerRegister = () => {

    // State variables for managing form inputs
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role] = useState("Traveller");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();// Initialize routing function

    // Function to validate form feilds
    const validate = () => {

        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const fullNameRegex = /^[A-Za-z ]*$/;


        let result = true;

        if (email === '' && username === '' && fullName === '' && password === '' && confirmPassword === '' && role === '') {
            result = false;
            swal("Registration Failed!", "You must fill all the fields ❗️❗️ ", "error");
        }
        else if (email === '' || email === null) {
            result = false;
            swal("Registration Failed!", "Email cannot be empty ❗️❗️ ", "error");
        }
        else if (username === '' || username === null) {
            result = false;
            swal("Registration Failed!", "User name cannot be empty ❗️❗️ ", "error");
        }
        else if (fullName === '' || fullName === null) {
            result = false;
            swal("Registration Failed!", "Full Name cannot be empty ❗️❗️ ", "error");
        }
        else if (password === '' || password === null) {
            result = false;
            swal("Registration Failed!", "Password cannot be empty ❗️❗️ ", "error");
        }
        else if (confirmPassword === '' || confirmPassword === null) {
            result = false;
            swal("Registration Failed!", "Confirm password cannot be empty ❗️❗️ ", "error");
        }
        else if (role === '' || role === null) {
            result = false;
            swal("Registration Failed!", "Role cannot be empty ❗️❗️ ", "error");
        }
        else if (!email.match(emailRegex)) {
            result = false;
            swal("Registration Failed!", "Please enter a valid email address ❗️❗️ ", "error");
        }
        else if (!password.match(passwordRegex)) {
            result = false;
            swal("Registration Failed!", "Please enter a strong password ❗️❗️ ", "error");
        }
        else if (password !== confirmPassword) {
            result = false;
            swal("Registration Failed!", "Passwords does not match ❗️❗️ ", "error");
        }
        else if (!fullName.match(fullNameRegex)) {
            result = false;
            swal("Registration Failed!", "Name cannot contain numbers ❗️❗️ ", "error");
        }
        return result;
    }

    // Function to handle form submission and traveler registration
    const handlesubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Create a traveler registration object with form input values
            let trRegObj = { nic, email, username, fullName, password, confirmPassword, role };
            console.log(trRegObj);
            // Send a POST request to the server for traveler registration
            fetch("http://localhost:5239/api/v1/authenticate/register", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(trRegObj)
            }).then((res) => {
                // Display a success message and navigate to the login page
                swal("Successful!", "Registration Successful ✅ 👏", "success");
                navigate('/TMViewTravellerAccs');
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <br></br><br></br>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <form onSubmit={handlesubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h1 className="text-center">Register Traveller</h1>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>NIC <span className="errmsg">*</span></label>
                                        <input
                                            value={nic}
                                            onChange={(e) => setNic(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            type={email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>User name <span className="errmsg">*</span></label>
                                        <input
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                        <input
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <div className="input-group">
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password <span className="errmsg"></span></label>
                                        <div className="input-group">
                                            <input
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="form-control"
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Role <span className="errmsg">*</span></label>
                                        <input
                                            value={role}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TMTravellerRegister;