////////////////////////////////////////////////////////////////////////////////////////////////////////
//FileName: CreateTrain.js
//FileType: VisCode Source file
//Author : Kalansooriya S. H
//Description : adding train details to the system function
////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from 'react';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './TrainForm.css';
import Multiselect from 'multiselect-react-dropdown';
import TimePicker from 'react-time-picker';
function TrainForm() {
  const [Arrivaltime, setArrivaltime] = useState('00:00'); 
  const [Departuretime, setDeparturetime] = useState('00:00'); 
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
    'Colombo Fort',
    'Maradana',
    'Colombo Slave Island',
    'Kandy',
    'Gampaha' ,
    'Negombo' ,
    'Anuradhapura' ,
    'Polonnaruwa' ,
    'Badulla',
    'Matara' ,
    'Galle' ,
    'Hikkaduwa' ,
    'Mount Lavinia',
    'Avissawella' ,
    'Ragama',
    'Kurunegala' ,
    'Chilaw' ,
    'Trincomalee' ,
    'Batticaloa',
    'Jaffna',
    'Polgahawela' ,
    'Nawalapitiya' ,
    'Hatton',
    'Ella' ,
    'Rambukkana' ,
    'Kegalle' ,
    'Haputale' ,
    'Nuwara Eliya' ,
    'Demodara' ,
    'Ohiya' ,
    'Nanu Oya' ,
    'Bandarawela',
    'Diyatalawa' ,
    'Aluthgama',
    'Bentota' ,
    'Ambalangoda' ,
    'Kalutara',
    'Panadura' ,
    'Wadduwa' ,
    'Beruwala'  
  ]);
  
  const [departureCityOptions, setDepartureCityOptions] = useState([
    'Colombo Fort',
    'Maradana',
    'Colombo Slave Island',
    'Kandy',
    'Gampaha' ,
    'Negombo' ,
    'Anuradhapura' ,
    'Polonnaruwa' ,
    'Badulla',
    'Matara' ,
    'Galle' ,
    'Hikkaduwa' ,
    'Mount Lavinia',
    'Avissawella' ,
    'Ragama',
    'Kurunegala' ,
    'Chilaw' ,
    'Trincomalee' ,
    'Batticaloa',
    'Jaffna',
    'Polgahawela' ,
    'Nawalapitiya' ,
    'Hatton',
    'Ella' ,
    'Rambukkana' ,
    'Kegalle' ,
    'Haputale' ,
    'Nuwara Eliya' ,
    'Demodara' ,
    'Ohiya' ,
    'Nanu Oya' ,
    'Bandarawela',
    'Diyatalawa' ,
    'Aluthgama',
    'Bentota' ,
    'Ambalangoda' ,
    'Kalutara',
    'Panadura' ,
    'Wadduwa' ,
    'Beruwala'  
  ]);
  const stopStationOptions = [
    { id: '1', name: 'Colombo Fort' },
    { id: '2', name: 'Maradana' },
    { id: '3', name: 'Colombo Slave Island' },
    { id: '4', name: 'Kandy' },
    { id: '5', name: 'Gampaha' },
    { id: '6', name: 'Negombo' },
    { id: '7', name: 'Anuradhapura' },
    { id: '8', name: 'Polonnaruwa' },
    { id: '9', name: 'Badulla' },
    { id: '10', name: 'Matara' },
    { id: '11', name: 'Galle' },
    { id: '12', name: 'Hikkaduwa' },
    { id: '13', name: 'Mount Lavinia' },
    { id: '14', name: 'Avissawella' },
    { id: '15', name: 'Ragama' },
    { id: '16', name: 'Kurunegala' },
    { id: '17', name: 'Chilaw' },
    { id: '18', name: 'Trincomalee' },
    { id: '19', name: 'Batticaloa' },
    { id: '20', name: 'Jaffna' },
    { id: '21', name: 'Polgahawela' },
    { id: '22', name: 'Nawalapitiya' },
    { id: '23', name: 'Hatton' },
    { id: '24', name: 'Ella' },
    { id: '25', name: 'Rambukkana' },
    { id: '26', name: 'Kegalle' },
    { id: '27', name: 'Haputale' },
    { id: '28', name: 'Nuwara Eliya' },
    { id: '29', name: 'Demodara' },
    { id: '30', name: 'Nuwara Eliya' },
    { id: '31', name: 'Ohiya' },
    { id: '32', name: 'Nanu Oya' },
    { id: '33', name: 'Bandarawela' },
    { id: '34', name: 'Ambalangoda' },
    { id: '35', name: 'Kalutara' },
    { id: '36', name: 'Panadura' },
    { id: '37', name: 'Wadduwa' },
    { id: '38', name: 'Beruwala' },
 
  ];
  
  
const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'stopStations') {
    // Convert selectedStations to an array of strings
    const selectedStationsArray = selectedStations.map((station) => station.name);
    
    setFormData({ ...formData, [name]: selectedStationsArray });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  
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
      
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error('Error:', response.status, errorData);

    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  
  return (
    <div>
     
 
  <div className="form-container">
  
  <form onSubmit={handleSubmit}>
  <h1>Add Train Details</h1>
    <div >
    <div class="row">
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
</div>
<div class="row">
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
    </div>
    <div class="row">
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
             {/* <TimePicker onChange={setDeparturetime} value={Departuretime}  className="form-input"/> */}
         
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
         {/* <TimePicker id="Arrivaltime"
          name="Arrivaltime" onChange={setArrivaltime} value={Arrivaltime}  className="form-input"/> */}
      
      </div>
      </div>
      <div class="row">
      <div className="form-group">
        <label htmlFor="class1reservation" className="form-label">Class 1 Reservation:</label>
        <input
          type="number"
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
          type="number"
          id="class2reservation"
          name="class2reservation"
          value={formData.class2reservation}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
 
</div>
    
    <button type="submit" className="form-button">Submit</button>
  </form>
</div>



    </div>
  );
}


export default TrainForm;
