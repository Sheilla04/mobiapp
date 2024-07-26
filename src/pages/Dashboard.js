import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import '../styles/Dashboard.css';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const userInfo = useGetUserInfo();

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
  }, [userInfo]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Calculate totals for the cards
  const totalTransactions = transactions.length;
  const totalCost = transactions.reduce((acc, curr) => acc + (curr.cost || 0), 0);

  // Prepare data for the Line chart
  const lineData = {
    labels: transactions.map(t => t.date?.toLocaleDateString() || 'Unknown Date'),
    datasets: [
      {
        label: 'Amount of costs in Ksh',
        data: transactions.map(t => t.cost),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)', // Changed to blue
        borderWidth: 2,
        tension: 0.1
      }
    ],
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

  // Prepare data for the Bar chart
  const categories = [...new Set(transactions.map(t => t.category))];
  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Total Costs per Category',
        data: categories.map(category => transactions.filter(t => t.category === category).reduce((acc, curr) => acc + (curr.cost || 0), 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard container-fluid" style={{paddingTop:'30px'}}>
      <div className="row g-3 my-2">
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor:'#5dd9ff'}}>
            <div>
              <h3 className="fs-2" style={{color:'white'}}>{totalTransactions}</h3>
              <p className="fs-5" >Total Transactions</p>
            </div>
            <i className="bi bi-cart-plus p-3 fs-1" style={{color:'white'}}></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor:'teal'}}>
            <div>
              <h3 className="fs-2">{totalCost.toFixed(2)}</h3>
              <p className="fs-5">Total Cost (Ksh)</p>
            </div>
            <i className="bi bi-currency-dollar p-3 fs-1" style={{color:'white'}}></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor:'indigo'}} >
            <div>
              <h3 className="fs-2">...</h3>
              <p className="fs-5">...</p>
            </div>
            <i className="bi bi-receipt p-3 fs-1" style={{color:'white'}}></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="p-3 shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor:'green'}}>
            <div>
              <h3 className="fs-2">...</h3>
              <p className="fs-5">...</p>
            </div>
            <i className="bi bi-people p-3 fs-1" style={{color:'white'}}></i>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header"><strong>Transactions Overview</strong></div>
            <div className="card-body">
              <div style={{ height: '400px', width: '100%' }}>
                <Line data={lineData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header"><strong>Breakdown of Transactions</strong></div>
            <div className="card-body" style={{height:'25vw', width:'25vw'}}>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" ><strong>Cost Analysis by Category</strong></div>
            <div className="card-body" style={{height:'25vw', width:'25vw'}}>
              <Bar data={barData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header"><strong>List of Charges</strong></div>
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
                    <th>Range</th>
                    <th>Type</th>
                    <th>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
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
    </div>
  );
};

export default Dashboard;








