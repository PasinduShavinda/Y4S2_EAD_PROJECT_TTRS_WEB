import React from "react";
import Navbar from "../../Common/NavBar/Navbar";

const TMHome = () => {

    return (
        <div>
            <Navbar /> 
            <h1>Travel Management Home</h1>
            <br></br>
            <a href="/TMCreateProfile">CREATE PROFILE</a>
            <br></br>
            <br></br>
            <a href="/TMViewProfiles">VIEW PROFILE</a>
            <br></br>
            <br></br>
            {/* <a href="/TMactiveDeactiveProfiles">Activate Deactivate Profile</a> */}
        </div>
    );
}

export default TMHome;