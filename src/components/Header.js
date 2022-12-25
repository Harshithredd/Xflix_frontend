import {Box,Typography} from "@mui/material";
import useStyles from "../styles";
import "./Header.css"
import { useHistory } from "react-router-dom";

export default function Header(props){
    const classes = useStyles();
    const history = useHistory();
    return(
            <Box className="header">
                <div onClick={()=>{history.push("/","from header")}}>
                    <Typography variant="h5" className="title"> <span style={{color:"#4283F5"}}>X </span>Flix</Typography>
                </div>
                <div>{props.children}</div>
                {props.upload ?
                (<div>
                    {props.upload}
                </div>)
                : null 
                }
                

            </Box>
        
    )
    
}
