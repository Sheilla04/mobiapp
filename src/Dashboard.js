import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure Chart.js is loaded
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase-config'; // Make sure this is the path to your Firebase config
import './Dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactionsCollectionRef = collection(db, 'transactions');
    const q = query(transactionsCollectionRef, orderBy('date', 'desc'), limit(3));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(transactionsData);
    });

    return () => unsubscribe();
  }, []);

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Amount of costs in Ksh',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const pieData = {
    labels: ['Withdrawal', 'Till to till', 'Customer to till'],
    datasets: [
      {
        label: 'Charges',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="cards">
        <div className="card">
          <h3>Amount of total transaction costs</h3>
          <p>300$</p>
        </div>
        <div className="card">
          <h3>Total number of transactions</h3>
          <p>50 times</p>
        </div>
        <div className="card">
          <h3>Target Amount of transaction costs</h3>
          <p>100$</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>Cost Chart</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-container">
          <h3>Percentage Cost Pie Chart</h3>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="transactions-table">
        <h3>Latest Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Category</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date?.toDate().toLocaleDateString()}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.category}</td>
                <td>{transaction.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
