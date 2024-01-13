import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useHistory } from "react-router-dom";

export const getMonths = (date) => {
  let startDate = new Date(date);
  let endDate = new Date();
  let months =
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());
  let years = 0;
  let dateString = `${months} months ago`;
  let yearString = "years";
  if (months > 12) {
    years = Math.ceil(months / 12);
    months = months % 12 === 0 ? 12 : months % 12;
  }
  if (years !== 0) {
    if (years === 1) {
      yearString = "year";
    }
    dateString = `${years} ${yearString} ${months} months ago`;
  }
  return dateString;
};

export default function VideoCard(props) {
  let history = useHistory();
  let dateString = getMonths(props?.video?.releaseDate);

  const handelVideoPageNav = (videoID) => {
    history.push(`/video/${videoID}`);

    if (props?.handelUrl) {
      props.handelUrl();
    }
  };

  return (
    <Card
      sx={{ maxWidth: 345, minHeight: 260, backgroundColor: "#414040" }}
      onClick={() => handelVideoPageNav(props.video._id)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.video?.previewImage}
          alt={props.video?.title}
        />
        <CardContent sx={{ backgroundColor: "#whitesmoke", color: "grey" }}>
          <Typography variant="h6" component="div" color="white">
            {props.video?.title}
          </Typography>
          <Typography variant="body2" color="whitesmoke">
            {dateString}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
