// TransactionInputPage.js

import React, { useState } from 'react';
import './TransactionInputPage.css';
import { calculateTransactionCost } from './hooks/costCalculationsInput';

const TransactionInputPage = () => {
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('Mpesa');
  const [transactionType, setTransactionType] = useState('Sending');
  const [category, setCategory] = useState('Send Money');
  const [costs, setCosts] = useState({});
  const [userCost, setUserCost] = useState(null);

  const categories = {
    Mpesa: {
      Sending: ['Till to till', 'Till to number payment', 'B2C (Registered user)', 'B2C (Unregistered user)', 'Send Money'],
      Receiving: ['Till to customer payment', 'Paybill(Mgao Tariff)', 'Paybill(Bouquet tariff)'],
      Withdrawal: ['B2C', 'Normal']
    },
    Tkash: {
      Sending: ['Tkash to Tkash', 'Mpesa and Airtel Money', 'Tkash to unregistered users'],
      Receiving: ['None'],
      Withdrawal: ['Normal']
    },
    Airtel: {
      Sending: ['Airtel to Airtel', 'Airtel to other networks'],
      Receiving: ['None'],
      Withdrawal: ['Normal']
    }
  };

  const handleCalculate = () => {
    const providers = ['Mpesa', 'Tkash', 'Airtel'];
    const newCosts = {};

    providers.forEach(currentProvider => {
      categories[currentProvider][transactionType].forEach(category => {
        newCosts[`${currentProvider} (${category})`] = category === 'None' ? 0 : calculateTransactionCost(transactionType, amount, currentProvider, category);
      });
    });

    setCosts(newCosts);
    setUserCost(calculateTransactionCost(transactionType, amount, provider, category));
  };

  return (
    <div className="container">
      <h1>Transaction Cost Calculator</h1>
      <div>
        <label>
          Amount:
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Provider:
          <select 
            value={provider} 
            onChange={(e) => {
              setProvider(e.target.value);
              setCategory(categories[e.target.value][transactionType][0] || '');
            }}
          >
            <option value="Mpesa">Mpesa</option>
            <option value="Tkash">Tkash</option>
            <option value="Airtel">Airtel Money</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Transaction Type:
          <select 
            value={transactionType} 
            onChange={(e) => {
              setTransactionType(e.target.value);
              setCategory(categories[provider][e.target.value][0] || '');
            }}
          >
            <option value="Sending">Sending</option>
            <option value="Receiving">Receiving</option>
            <option value="Withdrawal">Withdrawal</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Category:
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            disabled={(
              (transactionType === 'Receiving' && (provider === 'Tkash' || provider === 'Airtel')) ||
              (transactionType === 'Withdrawal' && (provider === 'Tkash' || provider === 'Airtel'))
            )}
          >
            {categories[provider][transactionType].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Mobile Money Provider</th>
            <th>Cost</th>
            <th>Selected Provider</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(costs).map(([categoryCost, cost], index) => (
            <tr key={index}>
              {index === 0 && <td rowSpan={Object.keys(costs).length}>{amount}</td>}
              <td>{categoryCost}</td>
              <td>{cost}</td>
              {index === 0 && <td rowSpan={Object.keys(costs).length}>{userCost}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionInputPage;