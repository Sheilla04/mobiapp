// src/Dashboard.js
import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure Chart.js is loaded
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const charges = [
    { range: '0 - 50', type: 'Withdrawal', provider: 'Safaricom' },
    { range: '51 - 100', type: 'Deposit', provider: 'Airtel' },
    { range: '101 - 150', type: 'Transfer', provider: 'Telkom' },
    // Add more charges as needed
  ];

  const filteredCharges = charges.filter((charge) =>
    charge.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="table-container">
        <h3>Charges</h3>
        <div className="controls">
          <input
            type="text"
            placeholder="Search by provider..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Range (KSH)</th>
              <th>Type of Charge</th>
              <th>Mobile Money Service Provider</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharges.map((charge, index) => (
              <tr key={index}>
                <td>{charge.range}</td>
                <td>{charge.type}</td>
                <td>{charge.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;



