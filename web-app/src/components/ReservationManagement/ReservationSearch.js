
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationSearch.css';

const ReservationSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      // Format the date for the API request
      const formattedDate = formatDateForApi(date);

      // Construct the API URL with the formatted date, from, and to values
      const apiUrl = `https://localhost:7084/api/Schedule/FilterSchedules?date=${formattedDate}&station1=${from}&station2=${to}`;

      // Make the API request
      const response = await fetch(apiUrl);
      const data = await response.json();
         console.log(formattedDate)
      // Update the scheduleData state with the API response
      setScheduleData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
                
                <td><button type="submit" className="">
                    Book now
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
       
      )}
    </div>
    </div>
  );
};

export default ReservationSearch;

