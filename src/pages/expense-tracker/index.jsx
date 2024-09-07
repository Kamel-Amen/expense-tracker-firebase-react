/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import useGetTransactions from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import './style.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const ExpensesTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('expense');

  const { balance, totalExpenses, totalIncome } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription('');
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='expense-tracker'>
        <div className='container'>
          <h1>{name}'s Expense Tracker</h1>
          <div className='balance'>
            <h3>Your Balance</h3>
            <h2 style={{ color: balance > 0 ? 'green' : 'red' }}>
              {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
            </h2>
          </div>
          <div className='summary'>
            <div className='income'>
              <h4>Income</h4>
              <p>${totalIncome}</p>
            </div>
            <div className='expenses'>
              <h4>Expenses</h4>
              <p>${totalExpenses}</p>
            </div>
          </div>
        </div>
        <form className='add-transaction' onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Description'
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type='number'
            placeholder='Amount'
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <input
            type='radio'
            id='expense'
            value='expense'
            // Handling Radio Button
            checked={transactionType === 'expense'}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label htmlFor='expense'>Expense</label>
          <input
            type='radio'
            id='income'
            value='income'
            // Handling Radio Button
            checked={transactionType === 'income'}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label htmlFor='income'>Income</label>

          <button type='submit'>Add Transaction</button>
        </form>
      </div>
      {profilePhoto && (
        <div className='profile'>
          <img src={profilePhoto} alt='photo' className='profile-photo' />
          <button className='sign-out-button' onClick={signUserOut}>
            Sign Out
          </button>
        </div>
      )}

      <div className='transactions'>
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;

            return (
              <li key={description}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} -{' '}
                  <label
                    style={{
                      color: transactionType === 'expense' ? 'red' : 'green',
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExpensesTracker;
