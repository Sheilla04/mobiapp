// hooks/useTransactionCost.js
export const useTransactionCost = () => {
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
  
    return { calculateCost };
  };
  