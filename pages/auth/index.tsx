import { NextPage } from 'next';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyABpOcsIRxfQgftb9MDADME2HGLlTcYwJY',
  authDomain: 'voyage-protocol.firebaseapp.com',
  projectId: 'voyage-protocol',
  storageBucket: 'voyage-protocol.appspot.com',
  messagingSenderId: '590897144911',
  appId: '1:590897144911:web:f0d2442b29e23f9ac0f63a',
  measurementId: 'G-82BKGD1FTE',
};
initializeApp(firebaseConfig);

const AuthPage: NextPage = () => {
  const router = useRouter();
  const auth = getAuth();
  const isSignIn = isSignInWithEmailLink(auth, router.asPath);
  const completeSignIn = async () => {
    try {
      const credentials = await signInWithEmailLink(
        auth,
        'ian.tan@voyage.finance',
        window.location.href
      );
      console.log('credentials: ', credentials);
    } catch (err) {
      console.error('failed to sign in: ', err);
    }
  };
  useEffect(() => {
    if (isSignIn) {
      console.log('signing in...');
      completeSignIn();
    }
  }, []);

  return <div>Complete Signing In</div>;
};

export default AuthPage;
