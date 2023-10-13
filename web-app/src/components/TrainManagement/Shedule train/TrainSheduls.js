


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TrainSheduls = () => {
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
   inputs.trainId = useParams().id;
  const history = useNavigate();
  var Sreserved1seates = 0
  var Sreserved2seates = 0
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5239/api/Train/${id}`)
        .then((res) => setInputs(res.data));
    };

    fetchHandler();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const schedule = {
      trainId: inputs.id,
      trainName: inputs.trainName,
      departureCity: inputs.departureCity,
      arrivalCity: inputs.arrivalCity,
      departuretime: inputs.departuretime,
      arrivaltime: inputs.arrivaltime,
      class1reservation: inputs.class1reservation,
      class2reservation: inputs.class2reservation,
      reserved1seates:Sreserved1seates,
      reserved2seates:Sreserved1seates,
      stopStations: inputs.stopStations,
      date: date,
      
    };

    await axios.post('http://localhost:5239/api/Schedule', schedule);
    window.location.reload();
   
  };
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      // Fetch data from the API with no parameters
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5239/api/Schedule/GetByTrainId/${inputs.trainId}`);
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
        try {
          await axios.delete(`http://localhost:5239/api/Schedule/${id}`);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting schedule:', error);
        }
      };
      

  return (
    <div>
      <h2>Train Details</h2>

      <p>Train Name :{inputs.trainName}</p>
      <p>{inputs.arrivalCity}</p>
      <p>{inputs.departureCity}</p>
      <p>{inputs.Arrivaltime}</p>
      <p>{inputs.Departuretime}</p>
      <p>{inputs.class1reservation}</p>
      <p>{inputs.class2reservation}</p>
      <p>{inputs.stopStations}</p>

      <h1>Show a Date Control</h1>

      <form onSubmit={handleSubmit}>
        <label>Schedule:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <div className="table-container">
      <h2>Table of Data from API:</h2>
      <table>
        <thead>
          <tr>
           
            <th>Train Name</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>Departure time</th>
            <th>Arrival time</th>
            <th>Reserved 1st class Seats</th>
            <th>Reserved 2st class Seats</th>
            <th>Stop Stations</th>
            <th>date</th>
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
      <td>{item.reserved1seates}</td>
      <td>{item.reserved2seates}</td>
      <td>{item.stopStations.join(', ')}</td> 
      <td>{item.date}</td> 
      <td> <button
        type="button"
        className="form-button"
        onClick={() => handleDelete(item.id)}
      >
        Delete
      </button></td> 
    </tr>
  ))}
</tbody>
      </table>
      </div>  
    </div>
    </div>
  );
};

export default TrainSheduls;




