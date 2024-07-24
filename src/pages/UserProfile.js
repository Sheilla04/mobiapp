
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { auth, db } from '../config/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import '../styles/UserProfile.css';
import defaultProfilePic from '../assets/defaultProfilePic.jpg'; 

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [show, setShow] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        photo: '',
    });

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    setFormValues(docSnap.data());
                } else {
                    toast.error("No user data found.");
                }
            } else {
                toast.error("User is not logged in.");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues({
                    ...formValues,
                    photo: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                await setDoc(docRef, formValues, { merge: true });
                setUserDetails(formValues);
                setShow(false);
                Swal.fire('Success', 'Profile updated successfully!', 'success');
            } else {
                toast.error("User is not logged in.");
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to update profile.', 'error');
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangePassword = () => {
        Swal.fire({
            title: 'Change Password',
            html: `
                <label for="swal-input1">Current Password</label>
                <input type="password" id="swal-input1" class="swal2-input">
                <label for="swal-input2">New Password</label>
                <input type="password" id="swal-input2" class="swal2-input">
                <label for="swal-input3">Confirm New Password</label>
                <input type="password" id="swal-input3" class="swal2-input">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const currentPassword = document.getElementById('swal-input1').value;
                const newPassword = document.getElementById('swal-input2').value;
                const confirmNewPassword = document.getElementById('swal-input3').value;
                return { currentPassword, newPassword, confirmNewPassword };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { currentPassword, newPassword, confirmNewPassword } = result.value;
                if (newPassword !== confirmNewPassword) {
                    Swal.fire('Error', 'New passwords do not match.', 'error');
                    return;
                }
                try {
                    const user = auth.currentUser;
                    const credential = EmailAuthProvider.credential(user.email, currentPassword);
                    await reauthenticateWithCredential(user, credential);
                    await updatePassword(user, newPassword);
                    Swal.fire('Success', 'Password changed successfully!', 'success');
                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = './login';
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    }

    if (!userDetails) {
        return <p>Loading user details...</p>;
    }

    return (
        <div style={{paddingTop: '35px'}}>
            <div className="profile-info">
                <h1>Hi, {userDetails.name}</h1>
            </div>
            <div className="user-profile">
                <div className="profile-header">
                    <img 
                        src={userDetails.photo || defaultProfilePic} 
                        alt="Profile" 
                        className="profile-img" 
                        style={{ borderRadius: '50%' }}
                    />
                </div>
                <div className="profile-body">
                    <div className="profile-section">
                        <h3>Settings</h3>
                        <Button variant="primary" onClick={handleShow}>
                            Edit Profile
                        </Button>
                        <Button variant="secondary" onClick={handleChangePassword}>
                            Change Password
                        </Button>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFormSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserProfile;



