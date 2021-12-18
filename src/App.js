import './App.css';
import {Fragment, useEffect, useState} from "react";
import Login from "./component/Login"
import ChatArea from "./component/ChatArea"
import { ThemeProvider } from "@mui/material";
import theme from "./component/theme";
import {getDatabase, onValue, ref} from "firebase/database";
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
const db = getDatabase();
console.log("in app")
function App() {
  const [user, onLogginUser] = useState({})
  const [listOfUser, onSetUser] = useState([])
  useEffect(() => {
    const dataBase = ref(db, "usr/path");
    onValue(dataBase, (snapshot => {
      const data = snapshot.val();
      let users=[]
      console.log("in remap")
      for (const [key, value]  of Object.entries(data)){
        const presence = value.present;
        if(key !== user){
          const user = {
            present: presence,
            name: key,
            msg: "",
            seen: false,
            delivered: false,
            sent: false,
            notification: false,
          }
          users.push(user);
        }
      }
      onSetUser(users);
    }))
  }, [])
  const updatingUserData = (value) => {
    onLogginUser(value)
  }
  return (
    <ThemeProvider theme={theme}>
      {Object.keys(user).length === 0 ? <Login afterLogin={updatingUserData}/>:<ChatArea listofUser={listOfUser} user={user}/>}
    </ThemeProvider>
  );
}

export default App;
