const Home = () => {

    return (
        <div>
            <h1>Home Page</h1>
            <br></br>
            <a href="/register">REGISTER</a>
            <br></br>
            <br></br>
            <a href="/login">LOGIN</a>

            <br></br>
            <br></br>            
            <br></br>

            <h1>Travel Management Home</h1>
            <br></br>
            <a href="/TMCreateProfile">CREATE PROFILE</a>
            <br></br>
            <br></br>
            <a href="/TMViewProfiles">VIEW PROFILE</a>
            <br></br>
            <br></br>
            <a href="/TMRegTraveller">CREATE TRAVELLER ACCOUNT</a>
            <br></br>
            <br></br>
            <a href="/TMViewTravellerAccs">VIEW TRAVELLER ACCOUNTS</a>
            {/* <a href="/TMactiveDeactiveProfiles">Activate Deactivate Profile</a> */}
        </div>
    );
}

export default Home;