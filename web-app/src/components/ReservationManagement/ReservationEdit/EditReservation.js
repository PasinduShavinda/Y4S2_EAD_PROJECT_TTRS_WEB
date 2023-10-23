import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios or your preferred HTTP library
import "./EditReservation.css"
const EditReservation = () => {
  const { id } = useParams(); // Get the ID from the URL parameter
  const [reservation, setReservation] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    seatcount1: 0,
    seatcount2: 0,
    trainName: '',
    trainId: '',
    userId: '',
    sheduleId: '',
    date: '',
  });

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = `https://localhost:7084/api/Reservation/${id}`;

    // Make an HTTP GET request to the API
    axios.get(apiUrl)
      .then(response => {
        // Set the response data to the 'reservation' state
        setReservation(response.data);
        // Set the initial form data with the fetched values
        setFormData(response.data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error fetching reservation details:', error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Define the API endpoint URL for the PUT request
    const apiUrl = `https://localhost:7084/api/Reservation/${id}`;

    // Make an HTTP PUT request to update the reservation
    axios.put(apiUrl, formData)
      .then(response => {
        // Handle the success response (status code 204)
        if (response.status === 204) {
          // Optionally, you can display a success message or perform any other actions
          console.log('Reservation updated successfully');
        }
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error updating reservation:', error);
      });
  };

  return (
    <div className="form-container" >

      <h2 style={{ marginBottom:"40px"}}>Edit Reservation</h2>
      {reservation ? (
        <div>
            <h6  style={{ marginBottom:"20px"}}>Date: {reservation.date}</h6>
          <h6  style={{ marginBottom:"20px"}}>Train Name: {reservation.trainName}</h6>
          <div>
            <label htmlFor="seatcount1">1 st Class Seates</label>
            <input
              type="number"
              name="seatcount1"
              value={formData.seatcount1}
              onChange={handleInputChange}
              className="form-input"
              style={{ width: '100%', padding: '5px', marginBottom:"20px"}}
            />
          </div>
          <div>
            <label htmlFor="seatcount2">2 nd Class Seates</label>
            <input
              type="number"
              name="seatcount2"
              value={formData.seatcount2}
              className="form-input"
              onChange={handleInputChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div className='btn-container'>
          <button onClick={handleSubmit} >
            Submit
          </button>
          </div>
        </div>
      ) : (
        <p>Loading reservation details...</p>
      )}
    </div>
  );
};

export default EditReservation;
