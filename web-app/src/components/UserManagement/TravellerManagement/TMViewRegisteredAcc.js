import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNat] = useState('');
    const [contactNumber, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [passportNumber, setPassport] = useState('');
    const [prefferedLanguage, setLang] = useState('');
    const [emergencyContactName, setEmName] = useState('');
    const [relationshipToTraveller, setRelt] = useState('');
    const [emergencyContactNumber, setEmcont] = useState('');


    const Token = sessionStorage.getItem('accessToken');
    const UserRole = sessionStorage.getItem('role');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

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

    // Get data to the create profile form
    const handleCreateForm = async (nic) => {
        handleShow();
        fetch(`https://localhost:7084/api/v1/regtravellers/view/${nic}`, {
            headers: {
                'Authorization': 'bearer ' + Token
            }
        })
            .then(res => {
                if (res.status === 401) {
                    swal("Unauthorized!", "Access Denied 🚫 ", "error");
                    return null;
                }
                else if (!res.ok) {
                    return false;
                }
                return res.json();
            })
            .then(res => {
                if (res) {
                    setNic(res.nic);
                    setEmail(res.email);
                    setUserName(res.userName);
                    setFullName(res.fullName);
                }
            });
    }

    // Get data to the create profile form
    const handleUpdateForm = async (nic) => {
        handleShow();
        fetch(`https://localhost:7084/api/v1/traveller/view/${nic}`, {
            headers: {
                'Authorization': 'bearer ' + Token
            }
        })
            .then(res => {
                if (res.status === 401) {
                    swal("Unauthorized!", "Access Denied 🚫 ", "error");
                    return null;
                }
                else if (!res.ok) {
                    return false;
                }
                return res.json();
            })
            .then(res => {
                if (res) {
                    setNic(res.nic);
                    setEmail(res.email);
                    setUserName(res.userName);
                    setFullName(res.fullName);
                    setAddress(res.address);
                    setContact(res.contactNumber);
                    setDob(res.dob);
                    setNat(res.nationality);
                    setPassport(res.passportNumber);
                    setLang(res.prefferedLanguage);
                    setEmcont(res.emergencyContactNumber);
                    setRelt(res.relationshipToTraveller);
                    setEmName(res.emergencyContactName);
                    setGender(res.gender);
                }
            });
    }

    const handleSave = (e) => {
        e.preventDefault();
        let ProfileObj = { fullName, userName, gender, dob, nationality, contactNumber, email, address, nic, passportNumber, prefferedLanguage, emergencyContactName, relationshipToTraveller, emergencyContactNumber };
        console.log(ProfileObj);
        fetch("https://localhost:7084/api/v1/traveller/save", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(ProfileObj)
        }).then((res) => {
            swal("Successful!", "Traveller Profile Successfully Created ✅ 👏", "success");
            handleClose();
            navigate('/TMViewTravellerAccs');
        }).catch((err) => {
            console.log(err);
        });
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
                                                <button className="btn btn-secondary" disabled={UserRole === 'BackOfficer'} onClick={() => handleCreateForm(item.nic)}>
                                                    Create
                                                </button> &nbsp;
                                                <button className="btn btn-secondary" disabled={UserRole === 'BackOfficer'} onClick={() => handleUpdateForm(item.nic)}>
                                                    Update
                                                </button> &nbsp;
                                                <button className="btn btn-secondary" disabled={UserRole === 'BackOfficer'} onClick={() => handleCreateForm(item.nic)}>
                                                    View
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
                                    <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} disabled />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Nationality" value={nationality} onChange={(e) => setNat(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Contact" value={contactNumber} onChange={(e) => setContact(e.target.value)} />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Passport" value={passportNumber} onChange={(e) => setPassport(e.target.value)} />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Preffered Language" value={prefferedLanguage} onChange={(e) => setLang(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Emerg. Contact Name" value={emergencyContactName} onChange={(e) => setEmName(e.target.value)} />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Relationship" value={relationshipToTraveller} onChange={(e) => setRelt(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Emerg. Contact Number" value={emergencyContactNumber} onChange={(e) => setEmcont(e.target.value)} />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
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