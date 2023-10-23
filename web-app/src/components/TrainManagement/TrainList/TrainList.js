////////////////////////////////////////////////////////////////////////////////////////////////////////
//FileName: TrainList.js
//FileType: VisCode Source file
//Author : Kalansooriya S. H
//Description : fetch train details
////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import "./TrainList.css"

const TrainList = () => {

  const [response, setResponse] = useState([]);
  const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Fetch data from the API with no parameters
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5239/api/Train');
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
    
  return (
    <div>
        <div className="table-container">
      <h2>Trains of Srilanka</h2>
      <div className='sug_table'>
      <table >
        <thead>
          <tr>
           
            <th>Train Name</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>Departure time</th>
            <th>Arrival time</th>
            <th>Number of 1st class Seats</th>
            <th>Number of 2st class Seats</th>
            <th>Stop Stations</th>
            <th>schedule</th>
          </tr>
        </thead>
        
        <tbody>
  {tableData.map((item) => (
    <tr key={item.id}>
      <td>{item.trainName}</td>
      <td>{item.departureCity}</td>
      <td>{item.arrivalCity}</td>
      <td>{item.arrivaltime}</td>
      <td>{item.departuretime}</td>
      <td>{item.class1reservation}</td>
      <td>{item.class2reservation}</td>
      <td>{item.stopStations.join(', ')}</td> 
      <td><a href={`/shedule/${item.id}`}> <button type="submit" className="btn btn-outline-info"> <i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;schedule</button></a>
     
      </td> 
    </tr>
  ))}
</tbody>
      </table>
      </div>
      </div>  
    </div>
  )
}

export default TrainList
