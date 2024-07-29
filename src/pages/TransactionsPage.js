
import React, { useState, useEffect } from 'react';
import { useAddTransaction } from '../hooks/useAddTransaction';
import useEditTransaction from '../hooks/useEditTransaction';
import { useDeleteTransaction } from '../hooks/useDeleteTransaction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { collection, query, where, getDocs, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';
import '../styles/TransactionsPage.css';

const TransactionsPage = () => {
  const { addTransaction } = useAddTransaction();
  const {
    show,
    editData,
    setEditData,
    handleEditTransaction,
    handleClose,
    handleShow,
  } = useEditTransaction();

  const { handleDeleteTransaction } = useDeleteTransaction();
  const userInfo = useGetUserInfo();
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    transactionType: '',
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

      
      fetchedTransactions.sort((a, b) => a.date - b.date);

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

  const validateForm = (data) => {
    if (!data.amount || !data.transactionType || !data.category) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill in all fields before submitting.',
      });
      return false;
    }
    return true;
  };

  const calculateCost = (amount, transactionType, category) => {
    amount = parseFloat(amount);
    if (transactionType === 'Receiving') {
      if (category === 'Till customer payment' && amount > 200) {
        return amount * 0.0055;
      }
      return receivingCostTable[category]?.find(([min, max, cost]) => amount >= min && amount <= max)?.[2] || 0;
    } else if (transactionType === 'Sending') {
      if (category === 'Till to till payment') {
        return Math.min(amount * 0.0025, 200);
      }
      return sendingCostTable[category]?.find(([min, max, cost]) => amount >= min && amount <= max)?.[2] || 0;
    } else if (transactionType === 'Withdrawal') {
      return withdrawalCostTable[category]?.find(([min, max, cost]) => amount >= min && amount <= max)?.[2] || 0;
    }
    return 0;
  };

  const handleAddTransaction = async () => {
    if (!validateForm(formData)) return;

    const { amount, transactionType, category } = formData;
    const cost = calculateCost(amount, transactionType, category);

    Swal.fire({
      title: 'Adding transaction...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const timestamp = Timestamp.fromDate(new Date());
      await addTransaction(userInfo, { ...formData, date: timestamp, cost });
      const newTransaction = { ...formData, date: new Date(), cost };
      const updatedTransactions = [...transactions, newTransaction].sort((a, b) => a.date - b.date);
      setTransactions(updatedTransactions);
      setFormData({
        amount: '',
        transactionType: '',
        category: '',
      });
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Transaction added successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add transaction. Please try again.',
      });
    }
  };

  const handleDelete = async (transactionId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteTransaction(transactionId);
          setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
          Swal.fire(
            'Deleted!',
            'Your transaction has been deleted.',
            'success'
          );
        } catch (error) {
          Swal.fire(
            'Error!',
            'Failed to delete transaction. Please try again.',
            'error'
          );
        }
      }
    });
  };

  const handleUpdateTransaction = async (updatedData) => {
    if (!validateForm(updatedData)) return;

    const { amount, transactionType, category } = updatedData;
    updatedData.cost = calculateCost(amount, transactionType, category);

    Swal.fire({
      title: 'Updating transaction...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { id, ...restData } = updatedData;
    const transactionDocRef = doc(db, 'transactions', id);

    try {
      await updateDoc(transactionDocRef, restData);
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === id ? { ...transaction, ...restData } : transaction
      ).sort((a, b) => a.date - b.date);
      setTransactions(updatedTransactions);
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Transaction updated successfully!',
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update transaction. Please try again.',
      });
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return '';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (transaction.category) {
      return transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  const transactionOptions = {
    Receiving: ['Till customer payment', 'Paybill(Mgao Tariff)', 'Paybill (Bouquet tariff)'],
    Sending: ['Till to till payment', 'Till to number payment', 'B2C(Registered users)', 'B2C(Unregistered users)'],
    Withdrawal: ['Normal', 'B2C charges'],
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="transactions-page">
        <h2>Transactions</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="primary" onClick={handleShow} className="add-transaction-btn">
          Add Transaction
        </Button>
        </div>
        <div className="table-responsive">
        <table>
          
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{getTimeAgo(transaction.date)}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.category}</td>
                <td>{(transaction.cost || 0).toFixed(2)}</td>
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
        </div>

        

        
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={editData ? editData.amount : formData.amount}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="transactionType">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control
                as="select"
                name="transactionType"
                value={editData ? editData.transactionType : formData.transactionType}
                onChange={handleFormChange}
              >
                <option value="">Select a type</option>
                {Object.keys(transactionOptions).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={editData ? editData.category : formData.category}
                onChange={handleFormChange}
              >
                <option value="">Select a category</option>
                {(transactionOptions[editData ? editData.transactionType : formData.transactionType] || []).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={editData ? () => handleUpdateTransaction(editData) : handleAddTransaction}
          >
            {editData ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};




const receivingCostTable = {
  'Paybill(Mgao Tariff)': [
    [0, 1000, 0],
    [1001, 1500, 5],
    [1501, 2500, 7],
    [2501, 3500, 9],
    [3501, 5000, 18],
    [5001, 7500, 25],
    [7501, 10000, 30],
    [10001, 15000, 39],
    [15001, 20000, 43],
    [20001, 25000, 47],
    [25001, 30000, 52],
    [30001, 35000, 62],
    [35001, 40000, 76],
    [40001, 45000, 80],
    [45001, 250000, 84],
  ],
  'Paybill (Bouquet tariff)': [
    [0, 100, 0],
    [101, 500, 5],
    [501, 1000, 10],
    [1001, 1500, 15],
    [1501, 2500, 20],
    [2501, 3500, 25],
    [3501, 5000, 34],
    [5001, 7500, 42],
    [7501, 10000, 48],
    [10001, 15000, 57],
    [15001, 20000, 62],
    [20001, 25000, 67],
    [25001, 30000, 72],
    [30001, 35000, 83],
    [35001, 40000, 99],
    [40001, 45000, 103],
    [45001, 250000, 108],
  ],
};

const sendingCostTable = {
  'Till to number payment': [
    [0, 100, 0],
    [101, 500, 7],
    [501, 1000, 13],
    [1001, 1500, 23],
    [1501, 2500, 33],
    [2501, 3500, 53],
    [3501, 5000, 57],
    [5001, 7500, 78],
    [7501, 10000, 90],
    [10001, 15000, 100],
    [15001, 20000, 105],
    [20001, 250000, 108],
  ],
  'B2C(Registered users)': [
    [0, 100, 0],
    [101, 1500, 5],
    [1501, 5000, 9],
    [5001, 20000, 11],
    [20001, 250000, 13],
  ],
  'B2C(Unregistered users)': [
    [101, 500, 8],
    [501, 1500, 14],
    [1501, 2500, 18],
    [2501, 3500, 25],
    [3501, 5000, 30],
    [5001, 7500, 37],
    [7501, 10000, 46],
    [10001, 15000, 62],
    [15001, 20000, 67],
    [20001, 35000, 73],
  ],
};

const withdrawalCostTable = {
  'Normal': [
    [0, 49, 0],
    [50, 100, 11],
    [101, 2500, 29],
    [2501, 3500, 52],
    [3501, 5000, 69],
    [5001, 7500, 87],
    [7501, 10000, 115],
    [10001, 15000, 167],
    [15001, 20000, 185],
    [20001, 35000, 197],
    [35001, 50000, 278],
    [50001, 250000, 309],
  ],
  'B2C charges': [
    [0, 49, 0],
    [50, 100, 11],
    [101, 1500, 34],
    [1501, 2500, 38],
    [2501, 3500, 61],
    [3501, 5000, 78],
    [5001, 7500, 98],
    [7501, 10000, 126],
    [10001, 15000, 178],
    [15001, 20000, 196],
    [20001, 35000, 210],
    [35001, 50000, 291],
    [50001, 250000, 322],
  ],
};

export default TransactionsPage;





