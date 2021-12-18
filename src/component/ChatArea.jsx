import {Grid, Toolbar, Typography} from "@mui/material";
import Profile from "./Profile";
import {initializeApp} from "firebase/app";
import { CssBaseline } from "@mui/material";
import {Box} from "@mui/system";
import ChatBox from "./ChatBox";
import { getDatabase, ref, onValue, update} from "firebase/database";
import {useEffect, useState} from "react";
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
const ChatArea = (props) => {
    const [listOfUser, onSetUser] = useState(props.listofUser)
    const [toUser, onSettingToUser] = useState("");
    let curUser = props.user.user.displayName;
    curUser=curUser.replaceAll('.','')
    console.log(curUser)

    useEffect(() => {
        console.log("use Effect");
        const dataBase = ref(db, "usr/path");
        onValue(dataBase, (snapshot => {
            const data = snapshot.val();
            let users=[]
            console.log("in remap")
            for (const [key, value]  of Object.entries(data)){
                const presence = value.present;
                if(key !== curUser){
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
        const chatDatabase = ref(db, curUser+"/msg");
        onValue(chatDatabase, (snapshot => {
            const data = snapshot.val();
            const newList = [...listOfUser]
            if (data !== null) {
                console.log("re map")
                for (const [key, val] of Object.entries(data)) {
                    const updates = {}
                    console.log(val.Msg, " ", key)
                    newList.forEach(e => {
                        if(e.name === key){
                            e.msg = val.Msg
                            e.seen = false
                            e.delivered=false
                            e.notification = true
                        }
                    })
                    updates[key + '/sent/' + curUser + '/delivered'] = true;
                    update(ref(db), updates).then(() => {}).catch(() => {})
                }
            }
            onSetUser(newList);
        }))
        const readAndReciptDatabase = ref(db, curUser+"/sent")
        onValue(readAndReciptDatabase, (snapshot => {
            console.log("inside this sent one ", curUser)
            const oldList = [...listOfUser]
            const data = snapshot.val()
            if (data !== null) {
                for (const [key, value] of Object.entries(data)) {
                    console.log(key, ' ', value)
                    if(value.seen === true){
                        oldList.forEach(e => {
                            if (e.name === key) {
                                e.seen = value.seen
                                e.delivered = false
                                e.notification = false
                            }
                        })
                    }
                    else if(value.delivered === true){
                        console.log("in deli")
                        oldList.forEach(e => {
                            if (e.name === key) {
                                e.delivered = value.delivered
                                e.seen = false
                                e.notification = false
                            }
                        })
                    }
                }
            }
            onSetUser(oldList);
        }))
    },[])

    const selectUser = (user, isSeen) => {
        console.log(user, ' ',isSeen)
        if(isSeen === true){
            const updates = {}
            console.log(user + '/sent/' + curUser + '/seen');
            updates[user + '/sent/' + curUser + '/seen'] = true;
            update(ref(db), updates).then(() => {}).catch(() => {})
            const newList=[...listOfUser]
            newList.forEach(e => {
                if(e.name === user){
                    e.notification = false
                    e.seen = false
                    e.delivered = false
                }
            })
            onSetUser(newList);
        }
        onSettingToUser(user);
    }

    const msgStatus = (toUser, msg) => {
        console.log(toUser, " ", msg);
        const oldList = [...listOfUser]
        oldList.forEach(e => {
            if(e.name === toUser){
                e.msg = msg
                e.sent = true
                e.delivered = false
                e.seen = false
            }
        })
        console.log(oldList);
        onSetUser(oldList);
    }

    return(
        <Box sx={{
            height: "100vh",
            width: "100%",
        }} >
            <Grid container direction="row" sx={{height: "100%"}}>
                <CssBaseline/>
                <Grid item xs={3}>
                    <Toolbar>
                        <Typography sx={{
                            fontSize: "16px",
                            fontFamily: "Roboto",
                            borderBottom: 1,
                            borderColor: "#F2EEEE"
                        }}>
                            {curUser}
                        </Typography>
                    </Toolbar>
                    {listOfUser.map((e) => <Profile onSelectingUser = {selectUser} key={e.name} value={e}/>)}
                </Grid>
                <Grid item xs={true} sx={{height: "100%"}}>
                    <ChatBox status={msgStatus} toUserChat={toUser} fromUser = {curUser}/>
                </Grid>
            </Grid>
        </Box>
    )
}
export default ChatArea;