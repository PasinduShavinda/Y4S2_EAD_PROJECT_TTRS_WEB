import React from 'react'

const AdminPage = () => {
  return (
    <div>
      <a href="/CreateTrain"> <button type="submit" className="form-button">create train</button></a>
      <a href="/Trainlist"> <button type="submit" className="form-button">train list</button></a>
      <a href="/reservationserch"> <button type="submit" className="form-button">Reervation</button></a>
    </div>
  )
}

export default AdminPage
