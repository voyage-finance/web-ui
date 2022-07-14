// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyABpOcsIRxfQgftb9MDADME2HGLlTcYwJY',
  authDomain: 'voyage-protocol.firebaseapp.com',
  projectId: 'voyage-protocol',
  storageBucket: 'voyage-protocol.appspot.com',
  messagingSenderId: '590897144911',
  appId: '1:590897144911:web:f0d2442b29e23f9ac0f63a',
  measurementId: 'G-82BKGD1FTE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore;
