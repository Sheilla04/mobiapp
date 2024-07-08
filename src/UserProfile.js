// src/UserProfile.js
import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { auth, db } from './config/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log(user);
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
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

    async function handleLogout() {
        try{
         await auth.signOut();
         window.location.href = './login';
         console.log("User logged out succesfully!");
        }catch(error){
            console.error("Error logging out:", error.message);
        }
    }
    return (
        <div>
            {userDetails ? (
                <>
                    <div className="user-profile">
                        <div className="profile-header">
                            <img src={userDetails.photo || "https://via.placeholder.com/150"} alt="Profile" className="profile-img" />
                            <div className="profile-info">
                                <h2>{userDetails.name}</h2>
                                <p>Email: {userDetails.email}</p>
                            </div>
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
                                    )) : <li>No recent activities.</li>}
                                </ul>
                            </div>
                            <div className="profile-section">
                                <h3>Settings</h3>
                                <button>Edit Profile</button>
                                <button>Change Password</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
}

export default UserProfile;



