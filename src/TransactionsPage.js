// src/TransactionsPage.js
import React, { useState } from 'react';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([
    { date: '2024-06-01', amount: 100, category: 'Withdrawal' },
    { date: '2024-06-02', amount: 50, category: 'Customer to till' },
    { date: '2024-06-03', amount: 200, category: 'Till to till' },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
        <button onClick={() => alert('Add Transaction clicked')}>Add Transaction</button>
        <button onClick={() => alert('Upload File clicked')}>Upload File</button>
      </div>
    </div>
  );
};

export default TransactionsPage;
