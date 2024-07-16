// hooks/useExtractDataFromPDF.js
import { useCallback } from 'react';
import { getDocument } from 'pdfjs-dist';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const useExtractDataFromPDF = () => {
  const extractDataFromPDF = useCallback(async (file) => {
    try {
      console.log('Extracting data from PDF:', file.name);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      const textContent = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContentObj = await page.getTextContent();
        const pageText = textContentObj.items.map(item => item.str).join(' ');
        textContent.push(pageText);
      }

      console.log('Text content extracted:', textContent);
      const transactions = parseTransactions(textContent.join(' '));
      console.log('Parsed transactions:', transactions);
      await saveTransactionsToFirestore(transactions);
      console.log('Transactions saved to Firestore');
    } catch (error) {
      console.error('Error extracting data from PDF:', error);
    }
  }, []);

  const parseTransactions = (text) => {
    // Implement the logic to parse the text and extract transaction data
    // This will depend on the format of the M-Pesa statement
    const transactions = [];
  
    // Example: Extract transactions using regex tailored to the provided text sample
    const regex = /(\w+)\s+(\d+-\d+-\d+\s\d+:\d+:\d+)\s+COMPLETED\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      transactions.push({
        date: new Date(match[2]),
        amount: parseFloat(match[3]),
        type: match[1],
        withdrawn: parseFloat(match[4]),
        balance: parseFloat(match[5]),
      });
    }
  
    return transactions;
  };
  

  const saveTransactionsToFirestore = async (transactions) => {
    const transactionCollectionRef = collection(db, 'transactions');
    for (const transaction of transactions) {
      await addDoc(transactionCollectionRef, transaction);
    }
  };

  return { extractDataFromPDF };
};