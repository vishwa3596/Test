import Grid from "@mui/material/Grid";
import {Avatar, Box, Paper, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {alpha} from "@mui/system";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const ProfileName = styled(Typography)(({theme}) => ({
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "Roboto",
    color: alpha("#000", 0.8)
}))

const ProfileInfo = styled('span')(({theme}) => ({
    fontSize: "14px",
    fontWeight: "100",
    color: "#707579",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "13ch"
}))

const LastSeen = styled(Typography)(({theme}) => ({
    fontSize: "0.7rem",
    fontWeight: "100",
    color: "#707579",
    textAlign: "center"
}))

const MsgCount = styled(Typography)(({theme}) => ({
    fontSize: "0.7rem",
    fontWeight: "900",
    color: "#5F95F5",
    textAlign: "center"
}))
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const Profile = (props) => {
    console.log("in profile ", props.value)
    const user = props.value;
    const msg = user.msg
    const isDelivered = user.delivered
    const isSeen = user.seen
    const name = user.name
    const isSent = user.sent
    const isNotification = user.notification
    let readAndRecipt=<Box></Box>;

    if(isSent === true){
        readAndRecipt = <DoneIcon fontSize="small"/>
    }
    if(isDelivered === true){
        readAndRecipt = <DoneAllIcon fontSize="small" color="secondary"/>
    }
    if(isSeen === true){
        readAndRecipt = <DoneAllIcon fontSize="small" color="success" />
    }
    if(isNotification === true && isSent === false && isDelivered === false && isSeen === false){
        readAndRecipt = <NotificationsActiveIcon fontSize="small" color="primary"/>
    }
    const onClickingChat = () => {
        console.log(name);
        if(isNotification === true){
            props.onSelectingUser(name, true);
        }
        else{
            props.onSelectingUser(name, false);
        }
    }
    return(
        <Box>
            <Toolbar sx={{
                justifyItems: "center",
                width: "100%",

            }}>
                <Paper elevation={0} onClick={onClickingChat} sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: "100%" ,
                    "&:hover": {
                        backgroundColor: "#F2EEEE",
                        cursor: "pointer",
                        borderRadius: "5px"
                    }}}>
                    {user.present === true ?  <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{bgcolor: "#5F95F5"}}>{name.charAt(0)}</Avatar>
                    </StyledBadge>: <Avatar sx={{bgcolor: "#5F95F5"}}>{name.charAt(0)}</Avatar>}
                    <Grid container direction="row" sx={{
                        ml: 1,
                        flex: 1 ,
                        justifyContent: "center"
                    }} alignItems="center">
                        <Grid item xs={10}>
                            <ProfileName>{name}</ProfileName>
                        </Grid>
                        <Grid item xs={2}>
                            <LastSeen>wed</LastSeen>
                        </Grid>
                        <Grid item xs={10}>
                            <ProfileInfo>{msg}</ProfileInfo>
                        </Grid>
                        <Grid item xs={2} sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: 21
                        }}>
                            {readAndRecipt}
                        </Grid>
                    </Grid>
                </Paper>
            </Toolbar>
        </Box>
    )
}
export default Profile;