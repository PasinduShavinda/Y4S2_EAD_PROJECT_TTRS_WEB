import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import YelBulb from "../../../assets/yelblb.png"
import BlckBulb from "../../../assets/blackblb.png"


const TMViewRegisteredAcc = () => {
    const [regTravellers, setRegTravllers] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        LoadRegTravellers();
    }, []);

    const LoadRegTravellers = () => {
        fetch("https://localhost:7084/api/v1/regtravellers/view").then(res => {
            console.log(res)
            if (!res.ok) {
                return false
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
            },
        });
    
        if (response.ok) {
            window.location.reload();
            swal("Successful!", "Account Deactivated ✅ ", "success");
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
                },
            });
        
            if (response.ok) {
                window.location.reload();
                swal("Successful!", "Account Activated ✅ ", "success");
            } else {
                console.error('Error deactivating user:', response.statusText);
            }
            } catch (error) {
            console.error('Error deactivating user:', error);
            }
        };
  
    // const GetUserAccess = () => {
    //     const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
    //     fetch("http://localhost:8000/roleaccess?role=" + userrole + "&menu=customer").then(res => {
    //         if (!res.ok) {
    //             navigate('/');
    //         toast.warning('You are not authorized to access');
    //             return false;
    //         }
    //         return res.json();
    //     }).then(res => {
    //         console.log(res);
    //         if (res.length > 0) {
    //             viewchange(true);
    //             let userobj = res[0];
    //             editchange(userobj.haveedit);
    //             addchange(userobj.haveadd);
    //             removechange(userobj.havedelete);
    //         }else{
    //             navigate('/');
    //         toast.warning('You are not authorized to access');
    //         }
    //     })
    // }

    // const handleadd = () => {
    //     if(haveadd){
    //     toast.success('added')
    //     }else{
    //         toast.warning('You are not having access for add');
    //     }
    // }
    // const handleedit = () => {
    //     if(haveedit){
    //     toast.success('edited')
    //     }
    //     else{
    //         toast.warning('You are not having access for Edit');
    //     }
    // }

    // const handleremove = () => {
    //     if(haveremove){
    //     toast.success('removed')
    //     }else{
    //         toast.warning('You are not having access for remove');
    //     }
    // }


    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Registered Travellers</h3>
                </div>
                <div className="card-body">
                    <button className="btn btn-success">Add (+)</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {regTravellers &&
                                regTravellers.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.nic}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.email}</td>
                                        <center>
                                        <td>
                                            {item.isActive ? (
                                                <img src={YelBulb} width="24" height="24" />
                                            ) : (
                                                <img src={BlckBulb} width="23" height="23" />
                                            )}
                                        </td>
                                        </center>
                                        <td>
                                            {item.isActive ? (
                                                <button className="btn btn-warning" onClick={() => handleDeactivate(item.nic)}>
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => handleActivate(item.nic)}>
                                                    Activate
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TMViewRegisteredAcc;