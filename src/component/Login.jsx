import { Button, Grid, Toolbar, Typography} from "@mui/material";
import Appbar from "@mui/material/AppBar";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Box, styled} from "@mui/system";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from "firebase/database";
import LoginIcon from '@mui/icons-material/Login';
import {Fragment} from "react";

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

const DisplayName = styled(Typography)(({
    fontFamily: "Montez",
    fontSize: "2.3em",
    fontWeight: 600,
    alingSelf: "center",
}));
const PaddedDiv = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
    marginBottom: "3rem",
}));

const Login = (props) => {

    const onLogin = async () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, provider);
        console.log(response);
        const db = getDatabase();
        const id = response.user.displayName;
        const new_id = id.replace('.','');
        await set(ref(db, "usr/path/"+new_id), {
            email: response.user.email,
            present: true,
            userName: response.user.displayName
        })
        props.afterLogin(response)
    }

    return(
        <Fragment>
            <Appbar
                elevation={0}
                color="appbarColor"
                sx={{
                    flexGrow: 1,
                    alignItems: "center",
                }}
            >
                <Toolbar>
                    <DisplayName color="secondary"> Dive </DisplayName>
                </Toolbar>
            </Appbar>
            <PaddedDiv />
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button color="primary" onClick={onLogin} variant="contained" startIcon={<LoginIcon />} sx={{
                    textTransform: "none",
                    alignItems: "center",
                    color: "#FFF"
                }}>
                    Login with Gmail
                </Button>
            </Box>

        </Fragment>
    )
}

export default Login;