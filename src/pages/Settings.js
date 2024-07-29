

import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase-config';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import '../styles/Settings.css';
import Swal from 'sweetalert2';

const Settings = () => {
  const [targetCost, setTargetCost] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const userInfo = useGetUserInfo();

  useEffect(() => {
    const fetchTargetData = async () => {
      if (!userInfo) return;

      const targetsCollectionRef = collection(db, 'targets');
      const q = query(targetsCollectionRef, where('uid', '==', userInfo));
      const targetSnapshot = await getDocs(q);

      if (!targetSnapshot.empty) {
        const targetData = targetSnapshot.docs[0].data();
        setTargetCost(targetData.targetCost);
        setTargetDate(targetData.targetDate);
      }
    };

    fetchTargetData();
  }, [userInfo]);

  const handleSaveChanges = async () => {
    if (!userInfo) return;

    if (!targetCost || !targetDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Data',
        text: 'Please fill in both target cost and target date.',
      });
      return;
    }

    const targetsCollectionRef = collection(db, 'targets');
    const q = query(targetsCollectionRef, where('uid', '==', userInfo));
    const targetSnapshot = await getDocs(q);

    try {
      if (targetSnapshot.empty) {
        // Create new target
        await addDoc(targetsCollectionRef, {
          uid: userInfo,
          targetCost,
          targetDate
        });
      } else {
        // Update existing target
        const targetDoc = targetSnapshot.docs[0];
        await updateDoc(targetDoc.ref, {
          targetCost,
          targetDate
        });
      }

      Swal.fire({
        icon: 'success',
        title: 'Changes Saved',
        text: 'Your target has been updated successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save changes. Please try again.',
      });
    }
  };

  return (
    <div style={{paddingTop:'60px'}}>
      <div className="settings-page">
        <h2>Settings</h2>
        <div className="settings-section">
          <label>
            Target Cost Amount:
            <input
              type="number"
              value={targetCost}
              onChange={(e) => setTargetCost(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div className="settings-section">
          <label>
            Target Date:
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <button onClick={handleSaveChanges} className="btn btn-primary">Save Changes</button>
      </div>
    </div>  
  );
};

export default Settings;