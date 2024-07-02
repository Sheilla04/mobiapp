import { useAddTransaction } from './hooks/useAddTransaction';
import React, { useState } from 'react';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const { addTransaction } = useAddTransaction();
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([
    { date: '2024-06-01', amount: 100, category: 'Withdrawal' },
    { date: '2024-06-02', amount: 50, category: 'Customer to till' },
    { date: '2024-06-03', amount: 200, category: 'Till to till' },
  ]);

  const [formData, setFormData] = useState({
    amount: '',
    category: ''
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTransaction = async () => {
    await addTransaction(formData);
    // Assuming addTransaction updates the transactions list in Firestore,
    // you can update the local state after adding the transaction.
    setTransactions([...transactions, formData]);
    setFormData({
      amount: '',
      category: ''
    });
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button onClick={() => alert('Upload File clicked')}>Upload File</button>
      </div>
      <div className="add-transaction-form">
        <h3>Add Transaction</h3>
        <form>
          <label>
            Amount:
            <input type="number" name="amount" value={formData.amount} onChange={handleFormChange} />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleFormChange} />
          </label>
          <button type="button" onClick={handleAddTransaction}>Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionsPage;
