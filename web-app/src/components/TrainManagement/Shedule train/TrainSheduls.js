////////////////////////////////////////////////////////////////////////////////////////////////////////
//FileName: TrainSheduls.js
//FileType: VisCode Source file
//Author : Kalansooriya S. H
//Description : crate and fetch train schedules according to to the train id
////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./TrainSheduls.css"
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
        .get(`https://localhost:7084/api/Train/${id}`)
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

    await axios.post('https://localhost:7084/api/Schedule', schedule);
    window.location.reload();
   
  };
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
      // Fetch data from the API with no parameters
      const fetchData = async () => {
        try {
          const response = await fetch(`https://localhost:7084/api/Schedule/GetByTrainId/${inputs.trainId}`);
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
          await axios.delete(`https://localhost:7084/api/Schedule/${id}`);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting schedule:', error);
        }
      };
      

  return (
    <div>
      <div>
      <h2>Train Schedule Create</h2>
      <div className='detailtrain'>
      <dl>
  <dt>Train Name </dt>
  <dd>{inputs.trainName}</dd>
  <dt>From</dt>
  <dd>{inputs.departureCity}</dd>
  <dt>To</dt>
  <dd>{inputs.arrivalCity}</dd>
  <dt>Total Number of 1st class seats</dt>
  <dd>{inputs.class1reservation}</dd>
  <dt>Total Number of 1st class seats</dt>
  <dd>{inputs.class2reservation}</dd>
</dl>
<form onSubmit={handleSubmit}>
        
        
        <div class="input-group mb-3">
  <input type="date" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"  
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="submit">Submit</button>
  </div>
</div>
      </form>
</div>

</div>

     
      <div>
        <div className="table-container">
      <h2>Scheduled Trains</h2>
      <table>
        <thead>
          <tr>
           
            <th>Train Name</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>Departure time</th>
            <th>Arrival time</th>
            <th>Reserved <br/>
              1st class Seats</th>
            <th>Reserved <br/>
              2st class Seats</th>
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
      <td> 
      <a className="btn btn-outline-warning" href={`#`}>
     <i className="fas fa-edit"></i>&nbsp;Edit
   </a>

   &nbsp;&nbsp;
   <a className="btn btn-outline-danger" href="#"  onClick={() => handleDelete(item.id)}>
     <i className="far fa-trash-alt"></i>&nbsp;Delete
   </a>
      
      
      
      </td> 
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




