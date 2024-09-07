// import React from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, 'transactions');
  const { userId } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userId,
      description,
      transactionAmount,
      transactionType,
      // serverTimestamp() ==> Specifies the time where 'addDoc()' called
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
};
