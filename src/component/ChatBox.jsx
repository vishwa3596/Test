import {Box, Grid, Toolbar, Typography} from "@mui/material";
import MsgField from "./MsgField";
import {useState} from "react";
import {getDatabase, ref, set} from "firebase/database";
import {initializeApp} from "firebase/app";
import NameBar from "./NameBar";
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

const ChatBox = (props) => {
    const [msg, onSettingMsg] = useState("");
    const toUser = props.toUserChat;
    const fromUser = props.fromUser;
    const onSendingMsg = async (msg) => {
        const db = getDatabase();
        set(ref(db, toUser+'/msg/'+fromUser), {
            Msg: msg,
        }).then(async () => {
            await set(ref(db, fromUser+"/sent/"+toUser),{
                delivered: false,
                seen: false
            })
            props.status(toUser, msg);
        }).catch(() => {
            //error symbol.
            console.log("error in writing data");
        })
    }
    return(
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%",  borderLeft: 1,
                borderColor: "#F2EEEE", }}
        >
            <NameBar value={toUser}/>
            <MsgField msgValue = {onSendingMsg}/>
        </Grid>
    )
}

export default ChatBox;
