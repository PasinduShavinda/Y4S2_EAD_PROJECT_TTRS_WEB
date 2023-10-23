import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditShedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Define the API endpoint URL
    const scheduleId = "6fcdeccf-dcfb-4c59-9ae4-4ac694f30b1c"; // Replace with your desired schedule ID
    const apiUrl = `https://localhost:7084/api/Schedule/${scheduleId}`;

    // Make an HTTP GET request to the API to fetch the schedule details
    axios.get(apiUrl)
      .then(response => {
        // Set the response data to the 'schedule' state
        setSchedule(response.data);
        // Set the initial form data with the fetched values
        setFormData(response.data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error fetching schedule details:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Define the API endpoint URL for the PUT request
    const apiUrl = `https://localhost:7084/api/Schedule/6fcdeccf-dcfb-4c59-9ae4-4ac694f30b1c`; // Replace with the schedule ID

    // Make an HTTP PUT request to update the schedule with the edited details
    axios.put(apiUrl, formData)
      .then(response => {
        // Handle the success response (status code 204)
        if (response.status === 204) {
          // Optionally, you can display a success message or perform any other actions
          console.log('Schedule updated successfully');
        }
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error updating schedule:', error);
      });
  };

  return (
    <div className="form-container" >
      {schedule ? (
        <div>
          <h2 style={{marginBottom :"40px"}}>Edit Schedule</h2>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="trainName">Train Name:</label>
            </div>
            <div class="col-sm">
            <input
              type="text"
              name="trainName"
              value={formData.trainName}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="departureCity">Departure City:</label>
            </div>
            <div class="col-sm">
            <input
              type="text"
              name="departureCity"
              value={formData.departureCity}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="arrivalCity">Arrival City:</label>
            </div>
            <div class="col-sm">
            <input
              type="text"
              name="arrivalCity"
              value={formData.arrivalCity}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="departuretime">Departure Time:</label>
            </div>
            <div class="col-sm">
            <input
              type="text"
              name="departuretime"
              value={formData.departuretime}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="arrivaltime">Arrival Time:</label>
            </div>
            <div class="col-sm">
            <input
              type="text"
              name="arrivaltime"
              value={formData.arrivaltime}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="class1reservation">Class 1 Reservation:</label>
            </div>
            <div class="col-sm">
            <input
              type="number"
              name="class1reservation"
              value={formData.class1reservation}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row' >
          <div class="col-sm">
            <label htmlFor="class2reservation">Class 2 Reservation:</label>
            </div>
            <div class="col-sm">
            <input
              type="number"
              name="class2reservation"
              value={formData.class2reservation}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="reserved1seates">Reserved 1st Class Seats:</label>
            </div>
            <div class="col-sm">
            <input
              type="number"
              name="reserved1seates"
              value={formData.reserved1seates}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="reserved2seates">Reserved 2nd Class Seats:</label>
            </div>
            <div class="col-sm">
            <input
              type="number"
              name="reserved2seates"
              value={formData.reserved2seates}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="date">Date:</label>
            </div>
            <div class="col-sm">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div style={{marginBottom :"20px"}} className='row'>
          <div class="col-sm">
            <label htmlFor="stopStations">Stop Stations:</label>
            </div>
            <div class="col-sm">
            <input
              type="text"
              name="stopStations"
              value={formData.stopStations.join(', ')}
              onChange={handleInputChange}
              className="form-input"
            />
            </div>
          </div>
          <div className='btn-container'>
          <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      ) : (
        <p>Loading schedule details...</p>
      )}
    </div>
  );
};

export default EditShedule;
