import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import YelBulb from "../../../assets/yelblb.png"
import BlckBulb from "../../../assets/blackblb.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TMViewRegisteredAcc = () => {

    const [regTravellers, setRegTravllers] = useState([]);
    const [show, setShow] = useState(false);
    
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [nic, setNic] = useState('');
    const [email, setEmail] = useState('');

    const Token = sessionStorage.getItem('accessToken');
    const UserRole = sessionStorage.getItem('role');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        LoadRegTravellers();
    }, []);

    // Retrieving All Travellers
    const LoadRegTravellers = () => {
        fetch("https://localhost:7084/api/v1/regtravellers/view", {
            headers: {
                'Authorization': 'bearer ' + Token
            }
        }).then(res => {
            if (res.status === 401) {
                swal("Unauthorized!", "Access Denied 🚫 ", "error");
                return null;
            }
            else if (!res.ok) {
                return false;
            }
            return res.json();
        }).then(res => {
            setRegTravllers(res)
        });
    }
    // Function to deactivate a user
    const handleDeactivate = async (nic) => {
        try {
            const response = await fetch(`https://localhost:7084/api/v1/traveller/account/deactivate/${nic}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + Token
                },
            });
            if (response.ok) {
                window.location.reload();
                swal("Successful!", "Account Deactivated ✅ ", "success");
            } else if (response.status === 403) {
                swal("Unaouthorized!", "Access Denied 🚫 ", "error");
            } else {
                console.error('Error deactivating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deactivating user:', error);
        }
    };

    // Function to deactivate a user
    const handleActivate = async (nic) => {
        try {
            const response = await fetch(`https://localhost:7084/api/v1/traveller/account/activate/${nic}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + Token
                },
            });
            if (response.ok) {
                window.location.reload();
                swal("Successful!", "Account Activated ✅ ", "success");
            } else if (response.status == 403) {
                swal("Unaouthorized!", "Access Denied 🚫 ", "error");
            } else {
                console.error('Error deactivating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deactivating user:', error);
        }
    };

    const handleEdit = (nic) => {
        handleShow();
    }

    const handleUpdate = (nic) => {
        handleShow();
    }

    return (
        <div className="container">
            <div className="card" style={{ marginTop: '30px' }}>
                <div className="card-header">
                    <h3>Registered Travellers</h3>
                </div>
                <Link to="/TMRegTraveller">
                    {UserRole !== 'Back Officer' && (
                        <button className="btn btn-success" style={{ marginLeft: '940px', marginTop: '10px' }}>
                            Create Account
                        </button>
                    )}
                </Link>
                <div className="card-body">
                    <div class="input-group">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" class="btn btn-outline-primary">search</button>
                    </div>
                    <br></br>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>NIC</th>
                                <th>Full Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regTravellers &&
                                regTravellers.map(item => (
                                    <tr key={item.id}>
                                        <td><center>{item.nic}</center></td>
                                        <td><center>{item.fullName}</center></td>
                                        <td><center>{item.userName}</center></td>
                                        <td><center>{item.email}</center></td>
                                        <center>
                                            <td>
                                                {item.isActive ? (
                                                    <img src={YelBulb} width="20" height="22" />
                                                ) : (
                                                    <img src={BlckBulb} width="20" height="22" />
                                                )}
                                            </td>
                                        </center>

                                        <td>
                                            <center>
                                                {item.isActive ? (
                                                    <button className="btn btn-warning" onClick={() => handleDeactivate(item.nic)}>
                                                        Deactivate
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-primary" onClick={() => handleActivate(item.nic)}>
                                                        Activate
                                                    </button>
                                                )}
                                            </center>
                                        </td>

                                        <td>
                                            <center>
                                                <button className="btn btn-secondary" disabled={UserRole === 'BackOfficer'} onClick={() => handleEdit(item.nic)}>
                                                    Create
                                                </button>

                                            </center>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e)=> setFullName(e.target.value)}/>
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="User Name" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="NIC" value={nic} onChange={(e)=> setNic(e.target.value)}/>
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUpdate}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default TMViewRegisteredAcc;