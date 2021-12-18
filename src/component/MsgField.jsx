import React, { useState } from "react";
import { Fragment } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { Grid} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const MsgField = (props) => {
    const [msg, onEnteringMsg] = useState("");
    const onInputText = (e) => {
        e.preventDefault();
        onEnteringMsg(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(msg);
        props.msgValue(msg);
    }

    return (
        <Fragment>
            <Grid container direction="row" justifyContent="center">
                <Paper
                    elevation={0}
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "60%",
                        borderRadius: "15px",
                        marginBottom: "10px",
                    }}
                >
                    <IconButton sx={{ p: "10px" }} aria-label="attach">
                        <AttachFileIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Message..."
                        inputProps={{ "aria-label": "Message..." }}
                        onChange={onInputText}
                    />
                    <IconButton
                        sx={{ backgroundColor: "5F95F5" }}
                        color="primary"
                        sx={{ p: "10px" }}
                        aria-label="MsgSend"
                        onClick={handleSubmit}
                    >
                        <SendIcon/>
                    </IconButton>
                </Paper>
            </Grid>
        </Fragment>
    );
};

export default MsgField;