// useEditTransaction.js

import { useState } from 'react';

const useEditTransaction = () => {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleClose = () => {
    setShow(false);
    setEditData(null); // Reset editData when closing the Modal
  };

  const handleShow = () => setShow(true);

  const handleEditTransaction = (transactionData) => {
    setEditData(transactionData);
    handleShow();
  };

  const handleUpdateTransaction = async (formData) => {
    // Implement your update logic here
    console.log("Updating transaction with data:", formData);
    handleClose();
  };

  return {
    show,
    editData,
    setEditData, // Ensure setEditData is returned from the hook
    handleEditTransaction,
    handleUpdateTransaction,
    handleClose,
    handleShow,
  };
};

export default useEditTransaction;