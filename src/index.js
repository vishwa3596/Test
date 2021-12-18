import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBzcG3MyGvDiBeHcbNtI23fXYzURip6LoA",
    authDomain: "clone-188a9.firebaseapp.com",
    projectId: "clone-188a9",
    storageBucket: "clone-188a9.appspot.com",
    messagingSenderId: "1002009184832",
    appId: "1:1002009184832:web:3317dd1444e558c66a6da5",
    measurementId: "G-Z6WP8P8HKH",
    databaseURL: "https://clone-188a9-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

console.log("here")
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
