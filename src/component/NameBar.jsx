import {Toolbar, Typography} from "@mui/material";

const NameBar = (props) => {
    return(
        <Toolbar>
            <Typography>
                {props.value}
            </Typography>
        </Toolbar>
    )
}
export default NameBar;