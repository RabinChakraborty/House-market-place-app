import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6uuynTS8R4D11Ss8933vlTOiec3KrP_w',
  authDomain: 'house-marketplace-92e46.firebaseapp.com',
  projectId: 'house-marketplace-92e46',
  storageBucket: 'house-marketplace-92e46.appspot.com',
  messagingSenderId: '1008921748093',
  appId: '1:1008921748093:web:9d7694204b792a8c768714',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
