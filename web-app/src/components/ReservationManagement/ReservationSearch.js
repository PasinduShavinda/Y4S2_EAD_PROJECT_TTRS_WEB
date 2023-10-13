

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationSearch.css';
import axios from 'axios';
const ReservationSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [seatCount1, setSeatCount1] = useState(0);
  const [seatCount2, setSeatCount2] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  const options = ['Station 1', 'Station 2', 'Station 3', 'Station 4'];

  const formatDateForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedDate = formatDateForApi(date);
      const apiUrl = `http://localhost:5239/api/Schedule/FilterSchedules?date=${formattedDate}&station1=${from}&station2=${to}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setScheduleData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNowClick = (index) => {
    setSelectedRow(scheduleData[index]);
    setShowBookingForm(true);
  };
 var uid ="wbhebhebhfb"
  const handleBookingSubmit = async(e) => {
    e.preventDefault();
   

    const reservation = {
      TrainId: selectedRow.trainId,
      TrainName: selectedRow.trainName,
      userId: uid,
      SheduleId: selectedRow.id,
      date: selectedRow.date,
      Seatcount1: seatCount1,
      Seatcount2: seatCount2
      
      
    };
    const schedule = {
      id:selectedRow.id,
      trainId: selectedRow.trainId,
      trainName: selectedRow.trainName,
      departureCity: selectedRow.departureCity,
      arrivalCity: selectedRow.arrivalCity,
      departuretime: selectedRow.departuretime,
      arrivaltime: selectedRow.arrivaltime,
      class1reservation: selectedRow.class1reservation,
      class2reservation:selectedRow.class2reservation,
      reserved1seates:seatCount1,
      reserved2seates:seatCount2,
      stopStations:selectedRow.stopStations,
      date:selectedRow.date
    };

    await axios.post('http://localhost:5239/api/Reservation',reservation);
    
   
    await axios.put(`http://localhost:5239/api/Schedule/${selectedRow.id}`,schedule);
    window.location.reload();

    setShowBookingForm(false);
  };

  return (
    <div className=''>
      <section className="book_section_inside">
        <div className="form_container">
          <form onSubmit={handleSearch}>
            <div className="form-row">
              <div className="col-lg-8">
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor="from">From</label>
                    <select
                      className="form-control"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      name="from"
                    >
                      <option value="">Select an option</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="to">To</label>
                    <select
                      className="form-control"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      name="to"
                    >
                      <option value="">Select an option</option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6">
                    <label htmlFor="date">Date</label>
                    <DatePicker
                      selected={date}
                      onChange={(newDate) => setDate(newDate)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="btn-container">
                  <button type="submit" className="">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {loading && <p>Loading...</p>}
      <div className="table-container">
        {scheduleData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Departure City</th>
                <th>Arrival City</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((item, index) => (
                <tr key={index}>
                  <td>{item.trainName}</td>
                  <td>{item.departureCity}</td>
                  <td>{item.arrivalCity}</td>
                  <td>{item.departuretime}</td>
                  <td>{item.arrivaltime}</td>
                  <td>
                    <button
                      type="button"
                      className=""
                      onClick={() => handleBookNowClick(index)}
                    >
                      Book now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    

      {selectedRow && (
        <div className="selected-row-details">
          <h2>Selected Train Details</h2>
          <ul>
            <li>Train Name: {selectedRow.trainName}</li>
            <li>Departure City: {selectedRow.departureCity}</li>
            <li>Arrival City: {selectedRow.arrivalCity}</li>
            <li>Departure Time: {selectedRow.departuretime}</li>
            <li>Arrival Time: {selectedRow.arrivaltime}</li>
            
            {/* Add more details here */}
          </ul>
        </div>
      )}

{showBookingForm && (
        <div className='book_section_inside'>
          <form onSubmit={handleBookingSubmit}>
            <div className="form-row">
              <div className="col-md-6">
                <label htmlFor="seatCount1">Seatcount1</label>
                <input
                  type="number"
                  className="form-control"
                  value={seatCount1}
                  onChange={(e) => setSeatCount1(e.target.value)}
                  name="seatCount1"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="seatCount2">Seatcount2</label>
                <input
                  type="number"
                  className="form-control"
                  value={seatCount2}
                  onChange={(e) => setSeatCount2(e.target.value)}
                  name="seatCount2"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReservationSearch;
