import { Box, Typography } from "@mui/material";
import "./Header.css";
import { useHistory } from "react-router-dom";

export default function Header(props) {
  const history = useHistory();
  return (
    <Box className="header">
      <button
        className="logoButton"
        onClick={() => {
          history.push("/", "from header");
        }}
      >
        <Typography variant="h5" className="title">
          {" "}
          <span style={{ color: "#4283F5" }}>X </span>Flix
        </Typography>
      </button>
      <div>{props?.children}</div>
      {props?.upload ? <div>{props.upload}</div> : null}
    </Box>
  );
}
