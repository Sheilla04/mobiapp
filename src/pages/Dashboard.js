

import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import 'chartjs-adapter-date-fns';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [targetData, setTargetData] = useState(null);
  const userInfo = useGetUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) return;

      // Fetch transactions
      const transactionsCollectionRef = collection(db, 'transactions');
      const transactionsQuery = query(transactionsCollectionRef, where('uid', '==', userInfo));
      const transactionsSnapshot = await getDocs(transactionsQuery);
      const fetchedTransactions = transactionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate() : null,
      }));

      fetchedTransactions.sort((a, b) => a.date - b.date);
      setTransactions(fetchedTransactions);

      // Fetch target data
      const targetsCollectionRef = collection(db, 'targets');
      const targetQuery = query(targetsCollectionRef, where('uid', '==', userInfo));
      const targetSnapshot = await getDocs(targetQuery);

      if (!targetSnapshot.empty) {
        setTargetData(targetSnapshot.docs[0].data());
      }
    };

    fetchData();
  }, [userInfo]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Calculate totals for the cards
  const totalTransactions = transactions.length;
  const totalCost = transactions.reduce((acc, curr) => acc + (curr.cost || 0), 0);
  const targetCost = targetData ? parseFloat(targetData.targetCost) : 0;
  const remainingCost = Math.max(targetCost - totalCost, 0);

  // Prepare data for the Line chart
  const lineData = {
    labels: transactions.map(t => t.date?.toLocaleDateString() || 'Unknown Date'),
    datasets: [
      {
        label: 'Amount of costs in Ksh',
        data: transactions.map(t => t.cost),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 4,
        tension: 0.4
      }
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // Prepare data for the Doughnut chart
  const transactionTypes = [...new Set(transactions.map(t => t.transactionType))];
  const doughnutData = {
    labels: transactionTypes,
    datasets: [
      {
        label: 'Charges by Transaction Type',
        data: transactionTypes.map(type => transactions.filter(t => t.transactionType === type).reduce((acc, curr) => acc + (curr.cost || 0), 0)),
        backgroundColor: ['rgb(255, 205, 86)', 'rgb(255, 99, 132)', 'rgb(153, 102, 255)', 'rgb(0, 0, 0)', 'rgb(54, 162, 235)'],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // Prepare data for the Bar chart with different colors
  const categories = [...new Set(transactions.map(t => t.category))];
  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Total Costs per Category',
        data: categories.map(category => transactions.filter(t => t.category === category).reduce((acc, curr) => acc + (curr.cost || 0), 0)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // Filter to show only the last three transactions, sorted by most recent first
  const recentTransactions = [...transactions].reverse().slice(0, 3);

  // Calculate average cost per transaction
  const averageCost = totalTransactions > 0 ? totalCost / totalTransactions : 0;

  // Prepare data for the progress towards target chart
  const progressData = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [totalCost, remainingCost],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const progressOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Towards Target',
      },
    },
  };

  return (
    <div className="dashboard container-fluid">
      <div className="row g-3 my-2">
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded card-blue">
            <div>
              <h3 className="fs-2">{totalTransactions}</h3>
              <p className="fs-5 card-text">Total Transactions</p>
            </div>
            <i className="bi bi-cart-plus p-3 fs-1"></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded card-teal">
            <div>
              <h3 className="fs-2">{totalCost.toFixed(2)}</h3>
              <p className="fs-5 card-text">Total Cost (Ksh)</p>
            </div>
            <i className="bi bi-currency-dollar p-3 fs-1"></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded card-indigo">
            <div>
              <h3 className="fs-2">{targetCost.toFixed(2)}</h3>
              <p className="fs-5 card-text">Target Cost (Ksh)</p>
            </div>
            <i className="bi bi-bullseye p-3 fs-1"></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded card-green">
            <div>
              <h3 className="fs-2">{remainingCost.toFixed(2)}</h3>
              <p className="fs-5 card-text">Remaining Cost (Ksh)</p>
            </div>
            <i className="bi bi-graph-up-arrow p-3 fs-1"></i>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Transactions Overview</strong></div>
            <div className="card-body">
              <div style={{ height: '400px', width: '100%' }}>
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Progress Towards Target</strong></div>
            <div className="card-body">
              <div style={{ height: '400px', width: '100%' }}>
                <Doughnut data={progressData} options={progressOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Breakdown of Transactions</strong></div>
            <div className="card-body">
              <div style={{ height: '400px', width: '100%' }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Cost Analysis by Category</strong></div>
            <div className="card-body">
              <div style={{ height: '400px', width: '100%' }}>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Recent Transactions</strong></div>
            <div className="card-body">
              <div className="d-flex justify-content-right mb-2">
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date?.toLocaleDateString()}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.transactionType}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Average Cost per Transaction</strong></div>
            <div className="card-body">
              <h3 className="text-center">{averageCost.toFixed(2)} Ksh</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header"><strong>Target Date</strong></div>
            <div className="card-body">
              <h3 className="text-center">{targetData ? targetData.targetDate : 'Not set'}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
