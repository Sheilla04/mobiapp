import React, { useState, useEffect } from 'react';
import { useAddTransaction } from './hooks/useAddTransaction';
import useEditTransaction from './hooks/useEditTransaction'; // Import useEditTransaction
import { useDeleteTransaction } from './hooks/useDeleteTransaction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { collection, query, where, getDocs, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase-config';
import { useGetUserInfo } from './hooks/useGetUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';

const TransactionsPage = () => {
  const { addTransaction } = useAddTransaction();
  const {
    show,
    editData,
    setEditData, // Destructure setEditData from useEditTransaction hook
    handleEditTransaction,
    handleClose,
    handleShow,
  } = useEditTransaction(); // Call useEditTransaction hook

  const { handleDeleteTransaction } = useDeleteTransaction();
  const userInfo = useGetUserInfo();
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userInfo) return;

      const transactionsCollectionRef = collection(db, 'transactions');
      const q = query(transactionsCollectionRef, where('uid', '==', userInfo));
      const transactionsSnapshot = await getDocs(q);
      const fetchedTransactions = transactionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate() : null,
      }));
      setTransactions(fetchedTransactions);
    };

    fetchTransactions();
  }, [userInfo, show]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e) => {
    if (!userInfo) return;
    const { name, value } = e.target;
    if (editData) {
      setEditData({
        ...editData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddTransaction = async () => {
    const timestamp = Timestamp.fromDate(new Date());
    await addTransaction(userInfo, { ...formData, date: timestamp });
    setTransactions([...transactions, { ...formData, date: new Date() }]);
    setFormData({
      amount: '',
      category: '',
    });
    handleClose();
  };

  const handleDelete = async (transactionId) => {
    await handleDeleteTransaction(transactionId);
    setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
  };

  const handleUpdateTransaction = async (updatedData) => {
    const { id, ...restData } = updatedData; // Destructure id and other fields from updatedData
    const transactionDocRef = doc(db, 'transactions', id);

    try {
      await updateDoc(transactionDocRef, restData); // Update document with restData (amount, category, etc.)
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === id ? { ...transaction, ...restData } : transaction
      );
      setTransactions(updatedTransactions);
      handleClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return ''; // Handle case where date is null or undefined
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (transaction.category) {
      return transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{getTimeAgo(transaction.date)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEditTransaction(transaction)}
                  style={{ cursor: 'pointer', marginRight: '18px', color: 'blue' }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(transaction.id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button onClick={handleShow}>Add Transaction</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={editData ? editData.amount : formData.amount}
                onChange={handleFormChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <Form.Select
                aria-label="Default select example"
                id="category"
                name="category"
                value={editData ? editData.category : formData.category}
                onChange={handleFormChange}
              >
                <option>Select Type of Transaction</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Payment">Payment</option>
                <option value="Transfer">Transfer</option>
              </Form.Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {editData ? (
            <Button variant="primary" onClick={() => handleUpdateTransaction(editData)}>
              Update Transaction
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddTransaction}>
              Add Transaction
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionsPage;
