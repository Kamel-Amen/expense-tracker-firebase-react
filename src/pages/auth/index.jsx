// import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import './style.css';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    // console.log(results);
    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    // console.log(JSON.stringify(authInfo));
    localStorage.setItem('auth', JSON.stringify(authInfo));
    navigate('/expense-tracker');
  };

  if (isAuth) {
    return <Navigate to='/expense-tracker' />;
  }

  return (
    <div className='login-page'>
      <p>Sign In With Google to Continue</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Auth;
