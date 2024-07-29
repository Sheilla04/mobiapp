// costCalculations.js

export const calculateTransactionCost = (transactionType, amount, provider, category) => {
    const mpesaSendingCosts = {
      "Till to number payment": [
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
        [20001, 250000, 108]
      ],
      "Send Money": [
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
        [20001, 250000, 108]
      ],
      "B2C (Registered user)": [
        [0, 100, 0],
        [101, 1500, 5],
        [1501, 5000, 9],
        [5001, 20000, 11],
        [20001, 250000, 13]
      ],
      "B2C (Unregistered user)": [
        [0, 100, 0],
        [101, 500, 8],
        [501, 1500, 14],
        [1501, 2500, 18],
        [2501, 3500, 25],
        [3501, 5000, 30],
        [5001, 7500, 37],
        [7501, 10000, 46],
        [10001, 15000, 62],
        [15001, 20000, 67],
        [20001, 35000, 73]
      ]
    };
  
    const mpesaReceivingCosts = {
      "Paybill(Mgao Tariff)": [
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
        [45001, 250000, 84]
      ],
      "Paybill(Bouquet tariff)": [
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
        [45001, 250000, 108]
      ]
    };
  
    const mpesaWithdrawalCosts = {
      "B2C": [
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
        [50001, 250000, 322]
      ],
      "Normal": [
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
        [50001, 250000, 309]
      ]
    };
  
    const tkashSendingCosts = {
      "Tkash to Tkash": [
        [0, 100, 0],
        [101, 500, 6],
        [501, 1000, 13],
        [1001, 1500, 21],
        [1501, 2500, 33],
        [2501, 3500, 47],
        [3501, 5000, 57],
        [5001, 7500, 67],
        [7501, 10000, 88],
        [10001, 20000, 93],
        [20001, 150000, 103]
      ],
      "Mpesa and Airtel Money": [
        [0, 100, 0],
        [101, 500, 6],
        [501, 1000, 13],
        [1001, 1500, 21],
        [1501, 2500, 33],
        [2501, 3500, 47],
        [3501, 5000, 57],
        [5001, 7500, 67],
        [7501, 10000, 88],
        [10001, 20000, 93],
        [20001, 150000, 103]
      ],
      "Tkash to unregistered users": [
        [0, 100, 0],
        [101, 500, 35],
        [501, 1000, 40],
        [1001, 1500, 45],
        [1501, 2500, 55],
        [2501, 3500, 85],
        [3501, 5000, 110],
        [5001, 7500, 135],
        [7501, 10000, 180],
        [10001, 15000, 230],
        [15001, 20000, 240],
        [20001, 35000, 270],
        [35001, 70000, 0]
      ]
    };
  
    const tkashWithdrawalCosts = {
      "Normal": [
        [0, 49, 0],
        [50, 100, 11],
        [101, 2500, 27],
        [2501, 3500, 50],
        [3501, 5000, 67],
        [5001, 7500, 83],
        [7501, 10000, 108],
        [10001, 15000, 160],
        [15001, 20000, 180],
        [20001, 35000, 190],
        [35001, 50000, 273],
        [50001, 150000, 303]
      ]
    };
  
    const airtelSendingCosts = {
      "Airtel to Airtel": [
        [0, 250000, 0]
      ],
      "Airtel to other networks": [
        [0, 100, 0],
        [101, 500, 6],
        [501, 1000, 11],
        [1001, 1500, 20],
        [1501, 2500, 30],
        [2501, 5000, 50],
        [5001, 7500, 70],
        [7501, 10000, 80],
        [10001, 15000, 90],
        [15001, 25000, 95],
        [25001, 35000, 100],
        [35001, 250000, 105]
      ]
    };
  
    const airtelWithdrawalCosts = {
      "Normal": [
        [0, 49, 0],
        [50, 100, 10],
        [101, 2500, 25],
        [2501, 3500, 44],
        [3501, 5000, 55],
        [5001, 7500, 70],
        [7501, 10000, 95],
        [10001, 15000, 135],
        [15001, 20000, 150],
        [20001, 35000, 160],
        [35001, 40000, 240],
        [40001, 45000, 260],
        [45001, 50000, 270],
        [50001, 250000, 300]
      ]
    };
  
    const calculateCostFromTable = (amount, table) => {
      for (let i = 0; i < table.length; i++) {
        if (amount >= table[i][0] && amount <= table[i][1]) {
          return table[i][2];
        }
      }
      return 0;
    };
  
    let calculatedCost = 0;
    switch (provider) {
      case 'Mpesa':
        if (transactionType === 'Sending') {
          switch (category) {
            case 'Till to number payment':
            case 'Send Money':
            case 'B2C (Registered user)':
            case 'B2C (Unregistered user)':
              calculatedCost = calculateCostFromTable(amount, mpesaSendingCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        } else if (transactionType === 'Receiving') {
          switch (category) {
            case 'Till to customer payment':
              if (amount > 200) {
                calculatedCost = amount * 0.0055;
              }
              break;
            case 'Paybill(Mgao Tariff)':
            case 'Paybill(Bouquet tariff)':
              calculatedCost = calculateCostFromTable(amount, mpesaReceivingCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        } else if (transactionType === 'Withdrawal') {
          switch (category) {
            case 'B2C':
            case 'Normal':
              calculatedCost = calculateCostFromTable(amount, mpesaWithdrawalCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        }
        break;
      case 'Tkash':
        if (transactionType === 'Sending') {
          switch (category) {
            case 'Tkash to Tkash':
            case 'Mpesa and Airtel Money':
            case 'Tkash to unregistered users':
              calculatedCost = calculateCostFromTable(amount, tkashSendingCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        } else if (transactionType === 'Withdrawal') {
          switch (category) {
            case 'Normal':
              calculatedCost = calculateCostFromTable(amount, tkashWithdrawalCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        } else if (transactionType === 'Receiving') {
          calculatedCost = 0;
        }
        break;
      case 'AirtelMoney':
        if (transactionType === 'Sending') {
          switch (category) {
            case 'Airtel to Airtel':
            case 'Airtel to other networks':
              calculatedCost = calculateCostFromTable(amount, airtelSendingCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        } else if (transactionType === 'Withdrawal') {
          switch (category) {
            case 'Normal':
              calculatedCost = calculateCostFromTable(amount, airtelWithdrawalCosts[category]);
              break;
            default:
              calculatedCost = 0;
          }
        } else if (transactionType === 'Receiving') {
          calculatedCost = 0;
        }
        break;
      default:
        calculatedCost = 0;
    }
    return calculatedCost;
  };
  