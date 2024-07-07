import React, { useState, useEffect } from 'react';
import { useAddTransaction } from './hooks/useAddTransaction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'; // Add Form component import
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './config/firebase-config';
import { useGetUserInfo } from './hooks/useGetUserInfo';

const TransactionsPage = () => {
  const { addTransaction } = useAddTransaction();
  const userInfo = useGetUserInfo();
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: ''
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userInfo) return;

      const transactionsCollectionRef = collection(db, 'transactions');
      const q = query(transactionsCollectionRef, where("uid", "==", userInfo));
      const transactionsSnapshot = await getDocs(q);
      const fetchedTransactions = transactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate() : null
      }));
      setTransactions(fetchedTransactions);
    };

    fetchTransactions();
  }, [userInfo]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e) => {
    if (!userInfo) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTransaction = async () => {
    const timestamp = Timestamp.fromDate(new Date()); // Get current Firestore Timestamp
    await addTransaction(userInfo, { ...formData, date: timestamp });
    setTransactions([...transactions, { ...formData, date: new Date() }]);
    setFormData({
      amount: '',
      category: ''
    });
    handleClose();
  };

  // Modal state and handlers
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    } else {
      return "Invalid Date";
    }
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
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button onClick={handleShow}>Add Transaction</button>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
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
                value={formData.amount}
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
                value={formData.category}
                onChange={handleFormChange}
              >
                <option>Select Type of Transaction</option>
                <option value="1">Withdrawal</option>
                <option value="2">Payment</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionsPage;
