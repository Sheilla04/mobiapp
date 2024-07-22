// src/UserProfile.js
import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';
import { auth, db } from '../config/firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        photo: '',
        aboutMe: '',
        recentActivities: []
    });

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log(user);
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    setFormValues(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("No such document!");
                    toast.error("No user data found.");
                }
            } else {
                console.log("User is not logged in");
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

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                await setDoc(docRef, formValues, { merge: true });
                setUserDetails(formValues);
                setIsEditing(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error("User is not logged in.");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error('Error updating profile: ', error);
        }
    };

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = './login';
            console.log("User logged out successfully!");
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
            {/* <p>Email: {userDetails.email}</p> */}
        </div>
        <div className="user-profile">
            <div className="profile-header">
                <img src={userDetails.photo || "https://via.placeholder.com/150"} alt="Profile" className="profile-img" />
            </div>
            <div className="profile-body">
                <div className="profile-section">
                    <h3>About Me</h3>
                    <p>{userDetails.aboutMe || "No information provided."}</p>
                </div>
                <div className="profile-section">
                    <h3>Recent Activities</h3>
                    <ul>
                        {userDetails.recentActivities ? userDetails.recentActivities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        )) : <li style={{backgroundColor: '#e7e1e1'}}>No recent activities.</li>}
                    </ul>
                </div>
                <div className="profile-section">
                    <h3>Settings</h3>
                    <button onClick={handleEditToggle}>{isEditing ? "Cancel" : "Edit Profile"}</button>
                    <button>Change Password</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                {isEditing && (
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Profile Picture URL:</label>
                            <input
                                type="text"
                                name="photo"
                                value={formValues.photo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>About Me:</label>
                            <textarea
                                name="aboutMe"
                                value={formValues.aboutMe}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                )}
            </div>
        </div>
    </div>
);

}

export default UserProfile;




