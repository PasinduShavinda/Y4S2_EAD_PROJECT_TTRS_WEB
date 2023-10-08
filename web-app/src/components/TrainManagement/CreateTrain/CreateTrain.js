import React, { useState, useEffect } from 'react';

import './TrainForm.css';
import Multiselect from 'multiselect-react-dropdown';

function TrainForm() {
  const [formData, setFormData] = useState({
    trainName: '',
    departureCity: '',
    arrivalCity: '',
    Departuretime:'',
    Arrivaltime:'',
    class1reservation:'',
    class2reservation:'',
    


  });
  const [selectedStations, setSelectedStations] = useState([]);

  const [response, setResponse] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [arrivalCityOptions, setArrivalCityOptions] = useState([
    'City 1',
    'City 2',
    'City 3', // Add more city options as needed
  ]);
  
  const [departureCityOptions, setDepartureCityOptions] = useState([
    'City A',
    'City B',
    'City C', // Add more city options as needed
  ]);
  const stopStationOptions = [
    { id: 'station1', name: 'Station 1' },
    { id: 'station2', name: 'Station 2' },
    { id: 'station3', name: 'Station 3' },
    // Add more station options as needed
  ];
  
  
const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'stopStations') {
    // Convert selectedStations to an array of strings
    const selectedStationsArray = selectedStations.map((station) => station.name);
    console.log(`selected stations${selectedStations}`)
    setFormData({ ...formData, [name]: selectedStationsArray });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

// Inside handleSubmit, add more detailed error handling
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Convert selectedStations to an array of strings
    const selectedStationsArray = selectedStations.map((station) => station.name);

    const updatedFormData = { ...formData, stopStations: selectedStationsArray };

    const response = await fetch('https://localhost:7084/api/Train', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });

    if (response.ok) {
      const data = await response.json();
      setResponse(data);
      // Reload the page after a successful submit
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error('Error:', response.status, errorData);

      // Display the error message to the user (you can set it in state)
      // Example: setError(errorData.errors.StopStations[0]);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  
  return (
    <div>
     
  <h2>Add Train Details</h2>
  <div className="form-container">
  <form onSubmit={handleSubmit}>
    <div >
      <div className="form-group">
        <label htmlFor="trainName" className="form-label">Train Name:</label>
        <input
          type="text"
          id="trainName"
          name="trainName"
          value={formData.trainName}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="departureCity" className="form-label">Departure City:</label>
        <select
          id="departureCity"
          name="departureCity"
          value={formData.departureCity}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="">Select Departure City</option>
          {departureCityOptions.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="arrivalCity" className="form-label">Arrival City:</label>
        <select
          id="arrivalCity"
          name="arrivalCity"
          value={formData.arrivalCity}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="">Select Arrival City</option>
          {arrivalCityOptions.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
    
      <div className="form-group">
        <label htmlFor="Departuretime" className="form-label">Departure Time:</label>
        <input
          type="text"
          id="Departuretime"
          name="Departuretime"
          value={formData.Departuretime}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Arrivaltime" className="form-label">Arrival Time:</label>
         <input
          type="text"
          id="Arrivaltime"
          name="Arrivaltime"
          value={formData.Arrivaltime}
          onChange={handleInputChange}
          className="form-input"
        />
      
      </div>
      <div className="form-group">
        <label htmlFor="class1reservation" className="form-label">Class 1 Reservation:</label>
        <input
          type="text"
          id="class1reservation"
          name="class1reservation"
          value={formData.class1reservation}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="class1reservation" className="form-label">Class 2 Reservation:</label>
        <input
          type="text"
          id="class2reservation"
          name="class2reservation"
          value={formData.class2reservation}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
  <label htmlFor="StopStations" className="form-label">Stop Stations:</label>
  <Multiselect
    options={stopStationOptions}
    displayValue="name"
    selectedValues={selectedStations}
    onSelect={(selectedList) => setSelectedStations(selectedList)}
    onRemove={(selectedList) => setSelectedStations(selectedList)}
    placeholder="Select Stop Stations"
  />
</div>

    
    <button type="submit" className="form-button">Submit</button>
  </form>
</div>

<a href="/Trainlist"> <button type="submit" className="form-button">trainlist</button></a>

    </div>
  );
}

export default TrainForm;
