import { Grid } from "@mui/material";
import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ list }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 3 }}
      sx={{ backgroundColor: "#181818", padding: "0px 2rem" }}
    >
      {list?.map((video) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
            <VideoCard video={video} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VideoList;
