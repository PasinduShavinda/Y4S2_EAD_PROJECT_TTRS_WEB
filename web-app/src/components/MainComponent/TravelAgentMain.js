import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TMViewRegisteredAcc from "../UserManagement/TravellerManagement/TMViewRegisteredAcc";
import ReservationSearch from "../ReservationManagement/ReservationSearch";
import ReservaionListforUser from "../ReservationManagement/ReservaionListforUser/ReservaionListforUser";

const TravelAgentMain = () => {
    const [value, setValue] = React.useState("one");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Manage Traveller Profiles" />
              <Tab value="two" label="Create Reservation" />
              <Tab value="three" label="View Reservation" />
            </Tabs>
          </Box>
        </div>
        {value === "one" && <TMViewRegisteredAcc /> || value === "two" && <ReservationSearch/> || value === "three" && <ReservaionListforUser/> }
      </div>
    );
  }
  
  export default TravelAgentMain;