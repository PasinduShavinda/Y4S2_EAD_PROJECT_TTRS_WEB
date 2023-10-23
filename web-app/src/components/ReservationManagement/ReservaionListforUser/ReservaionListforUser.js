import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
const ReservaionListforUser = () => {
   var userId = "test"; // Replace 'test' with the actual user ID

  const [response, setResponse] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch reservations data from the API based on the user's ID
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7084/api/Reservation/byUserId/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleDelete = async (id, date, SheduleId) => {
    const currentDate = new Date();
    const reservationDate = new Date(date);
    const differenceInDays = Math.floor((reservationDate - currentDate) / (1000 * 60 * 60 * 24));

    
  
    if (differenceInDays <= 5) {
      // Check if the date is within 5 days from today
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cant delete rerservation with in 5 days',
       
      })
    } else {
      try {
        await axios.delete(`https://localhost:7084/api/Reservation/${id}`);
        
        window.location.reload();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };
  const handleEdit = (id, date) => {
    const currentDate = new Date();
    const reservationDate = new Date(date);
    const differenceInDays = Math.floor((reservationDate - currentDate) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 5) {
      // Check if the date is within 5 days from today
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Can't edit reservation within 5 days",
      });
      console.log(differenceInDays)
    } else {
      window.location.href = `/edit/${id}`;
    }
  };

  return (
    <div>
      <div className="table-container">
        <h2>Reservation History</h2>
        <table>
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Date</th>
              <th>1st Class Seats</th>
              <th>2nd Class Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.trainName}</td>
                <td>{item.date}</td>
                <td>{item.seatcount1}</td>
                <td>{item.seatcount2}</td>
                <td>
                  
                <a
                    className="btn btn-outline-warning"
                    href="#"
                    onClick={() => handleEdit(item.id, item.date)}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;&nbsp;
                  <a className="btn btn-outline-danger" href="#" onClick={() => handleDelete(item.id, item.date ,item.SheduleId)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReservaionListforUser;
