////////////////////////////////////////////////////////////////////////////////////////////////////////
// FileName: TMViewRegisteredAcc.js
// FileType: JavaScript File
// Author: IT20140298 Shavinda W.A.P
// Description: View Registered Traveller Accounts 
////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ActiveBtn from "../../../assets/active.png"
import InactiveBtn from "../../../assets/inactive.png"
import Notify from "../../../assets/notify.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TMViewRegisteredAcc = () => {

    // State variables for managing component state
    const [regTravellers, setRegTravllers] = useState([]);

    const [show, setShow] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

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

    const [editId, setEditId] = useState('');
    const [isEdit, setIsEdit] = useState();

    const Token = sessionStorage.getItem('accessToken');
    const UserRole = sessionStorage.getItem('role');

    // Function to handle the closing of modal
    const handleClose = () => {
        setShow(false);
        setShowProfile(false);
        window.location.reload();
    }
    const handleShow = () => setShow(true);
    const handleShowProfile = () => setShowProfile(true);

    const navigate = useNavigate();

    // UseEffect hook to load registered travelers when the component mounts
    useEffect(() => {
        LoadRegTravellers();
    }, []);

    // Retrieving All Travellers
    const LoadRegTravellers = () => {
        fetch("http://localhost:5239/api/v1/regtravellers/view", {
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
        swal({
            title: 'Are you sure?',
            text: 'Once deactivated, The travellers cannot access their accounts!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDeactivate) => {
            if (willDeactivate) {
                try {
                    const response = await fetch(`http://localhost:5239/api/v1/traveller/account/deactivate/${nic}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + Token, // 'Bearer' should be capitalized
                        },
                    });
                    if (response.ok) {
                        window.location.reload();
                        swal("Successful!", "Account Deactivated ✅ ", "success");
                    } else if (response.status === 403) {
                        swal("Unauthorized!", "Access Denied 🚫 ", "error"); // Corrected the typo here
                    } else {
                        console.error('Error deactivating user:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error deactivating user:', error);
                }
            } else {
                swal('Cancelled', 'The profile has not been deactivated.', 'info');
            }
        });
    };


    // Function to deactivate a user
    const handleActivate = async (nic) => {
        swal({
            title: 'Are you sure?',
            text: 'Once activated, The travellers can access their accounts!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willActivate) => {
            if (willActivate) {
                try {
                    const response = await fetch(`http://localhost:5239/api/v1/traveller/account/activate/${nic}`, {
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
            } else {
                swal('Cancelled', 'The profile has not been Activated.', 'info');
            }
        });
    };

    // Get data to the create profile form
    const handleCreateForm = async (nic) => {
        setIsEdit(false);
        handleShow();
        fetch(`http://localhost:5239/api/v1/regtravellers/view/${nic}`, {
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
        setIsEdit(true);
        handleShow();
        fetch(`http://localhost:5239/api/v1/traveller/view/${nic}`, {
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
                    setEditId(res.nic);
                }
            });
    }

    // Get data to the profile form
    const handleViewProfile = async (nic) => {

        handleShowProfile();
        fetch(`http://localhost:5239/api/v1/traveller/view/${nic}`, {
            headers: {
                method: 'GET',
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
                    setEditId(res.nic);
                }
            });
    }

    const handleSave = (e) => {
        e.preventDefault();
        // Create a profile object with data
        let ProfileObj = { fullName, userName, gender, dob, nationality, contactNumber, email, address, nic, passportNumber, prefferedLanguage, emergencyContactName, relationshipToTraveller, emergencyContactNumber };
        console.log(ProfileObj);
        // Send a POST request to save the profile
        fetch("http://localhost:5239/api/v1/traveller/save", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(ProfileObj)
        }).then((res) => {
            // Handle success: close the form, show a success message, and navigate to a new page
            handleClose();
            swal("Successful!", "Traveller Profile Successfully Created ✅ 👏", "success");
            navigate('/TMViewTravellerAccs');
        }).catch((err) => {
            // Handle any errors by logging them
            console.log(err);
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        // Create an update object with data
        let updObj = { fullName, userName, gender, dob, nationality, contactNumber, email, address, nic, passportNumber, prefferedLanguage, emergencyContactName, relationshipToTraveller, emergencyContactNumber };
        // Send a PUT request to update the profile with a specific ID
        fetch(`http://localhost:5239/api/v1/traveller/update/${editId}`, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updObj)
        })
            .then((res) => {
                // Handle success: close the form, show a success message, and navigate to a new page
                handleClose();
                swal("Successful!", "Traveller Profile Successfully Updated ✅ 👏", "success");
                navigate('/TMViewTravellerAccs');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteProfile = (nic) => {
        // Show a confirmation dialog before proceeding with the deletion
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this profile!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // Send a DELETE request to delete the profile with a specific NIC
                fetch(`http://localhost:5239/api/v1/traveller/delete/${nic}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'bearer ' + Token,
                    },
                }).then((res) => {
                    if (res.status === 401) {
                        swal('Unauthorized!', 'Access Denied 🚫', 'error');
                        return null;
                    } else if (res.ok) {
                        swal('Success!', 'Profile has been deleted!', 'success');
                    } else {
                        swal('Cancelled', 'The profile has not been deleted.', 'info');
                    }
                });
            }
        });
    };




    return (
        <div className="container">
            <div className="card" style={{ marginTop: '30px' }}>
                <div className="card-header">
                    <h3>Registered Travellers</h3>
                </div>
                <Link to="/TMRegTraveller">
                    {UserRole !== 'Back Officer' && (
                        <button className="btn btn-success" style={{ marginLeft: '1100px', marginTop: '10px' }}>
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
                                        <td><center>{item.email}&nbsp;{item.isRequestSent ? (
                                            <img src={Notify} width="25" />
                                        ) : (
                                            <p></p>
                                        )} </center></td>
                                        <center>
                                            <td>
                                                {item.isActive ? (
                                                    <img src={ActiveBtn} width="35" height="25" />
                                                ) : (
                                                    <img src={InactiveBtn} width="35" height="22" />
                                                )}
                                            </td>
                                        </center>

                                        <td>
                                            <center>
                                                {item.isActive ? (
                                                    <button className="btn btn-warning" disabled={UserRole === 'Travel Agent'} onClick={() => handleDeactivate(item.nic)}>
                                                        Deactivate
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-primary" disabled={UserRole === 'Travel Agent'} onClick={() => handleActivate(item.nic)}>
                                                        Activate
                                                    </button>
                                                )}
                                            </center>
                                        </td>

                                        <td>
                                            <center>
                                                <button className="btn btn-info" disabled={UserRole === 'Back Officer'} onClick={() => handleCreateForm(item.nic)}>
                                                    Create
                                                </button> &nbsp;
                                                <button className="btn btn-success" disabled={UserRole === 'Back Officer'} onClick={() => handleUpdateForm(item.nic)}>
                                                    Update
                                                </button> &nbsp;
                                                <button className="btn btn-dark" disabled={UserRole === 'Back Officer'} onClick={() => handleViewProfile(item.nic)}>
                                                    View
                                                </button> &nbsp;
                                                <button className="btn btn-danger" disabled={UserRole === 'Back Officer'} onClick={() => handleDeleteProfile(item.nic)}>
                                                    Delete
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
                            {isEdit ? (
                                <Modal.Title>Update Profile</Modal.Title>
                            ) : (
                                <Modal.Title>Create Profile</Modal.Title>
                            )}
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <input type="text" className="form-control" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} />
                                </Col>

                                <Col>
                                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

                            {isEdit ? (
                                <Button variant="primary" onClick={handleUpdate}>Update</Button>
                            ) : (
                                <Button variant="primary" onClick={handleSave}>Save</Button>
                            )}

                        </Modal.Footer>
                    </Modal>

                    <Modal show={showProfile} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Travller Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <text>Full Name</text>
                                    <br></br>
                                    <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>User Name</text>
                                    <input type="text" className="form-control" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} disabled />
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <Col>
                                    <text>NIC</text>
                                    <input type="text" className="form-control" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>Email</text>
                                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <text>Gender</text>
                                    <input type="text" className="form-control" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>Date of Birth</text>
                                    <input type="text" className="form-control" placeholder="DOB" value={dob} onChange={(e) => setDob(e.target.value)} disabled />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col><text>Nationality</text>
                                    <input type="text" className="form-control" placeholder="Nationality" value={nationality} onChange={(e) => setNat(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>Contact Number</text>
                                    <input type="text" className="form-control" placeholder="Contact" value={contactNumber} onChange={(e) => setContact(e.target.value)} disabled />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <text>Address</text>
                                    <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>Passport Number</text>
                                    <input type="text" className="form-control" placeholder="Passport" value={passportNumber} onChange={(e) => setPassport(e.target.value)} disabled />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <text>Preffered Language</text>
                                    <input type="text" className="form-control" placeholder="Preffered Language" value={prefferedLanguage} onChange={(e) => setLang(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>Emergancy Contact name</text>
                                    <input type="text" className="form-control" placeholder="Emerg. Contact Name" value={emergencyContactName} onChange={(e) => setEmName(e.target.value)} disabled />
                                </Col>
                            </Row>

                            <br></br>
                            <Row>
                                <Col>
                                    <text>Relationship</text>
                                    <input type="text" className="form-control" placeholder="Relationship" value={relationshipToTraveller} onChange={(e) => setRelt(e.target.value)} disabled />
                                </Col>

                                <Col>
                                    <text>Emergency Contact Number</text>
                                    <input type="text" className="form-control" placeholder="Emerg. Contact Number" value={emergencyContactNumber} onChange={(e) => setEmcont(e.target.value)} disabled />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default TMViewRegisteredAcc;