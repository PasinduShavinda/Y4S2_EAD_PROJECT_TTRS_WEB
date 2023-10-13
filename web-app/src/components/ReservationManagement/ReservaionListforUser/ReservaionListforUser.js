/* 
FileName: ReservaionListforUser.js
FileType: Visual Code Source file
Author: Kalansooriya S. H
Description: This component filters reservations based on the user ID and displays them in a table. It also provides the ability to delete reservations.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const handleDelete = async (id) => {
    // Handle the deletion of a reservation
    try {
      await axios.delete(`https://localhost:7084/api/Reservation/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting schedule:', error);
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
                  <a className="btn btn-outline-warning" href={`#`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;&nbsp;
                  <a className="btn btn-outline-danger" href="#" onClick={() => handleDelete(item.id)}>
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
