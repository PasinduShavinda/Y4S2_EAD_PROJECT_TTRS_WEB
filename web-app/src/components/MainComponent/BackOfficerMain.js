import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TMViewRegisteredAcc from "../UserManagement/TravellerManagement/TMViewRegisteredAcc";
import CreateTrain from "../TrainManagement/CreateTrain/CreateTrain";
import TrainList from "../TrainManagement/TrainList/TrainList";

const BackOfficerMain = () => {
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
            <Tab value="one" label="Activate/Deacticate A/C" />
            <Tab value="two" label="Create Train" />
            <Tab value="three" label="View Trains" />
          </Tabs>
        </Box>
      </div>
      {value === "one" && <TMViewRegisteredAcc /> || value === "two" && <CreateTrain/> || value === "three" && <TrainList/> }
    </div>
  );
}

export default BackOfficerMain;