import { Grid } from "@mui/material";
import React from "react";
import { videoListMock } from "../../utils/constants";
import Card from "@mui/material/Card";
import styles from "./ShimmerUI.module.css";

const CardWrapper = () => {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 260, backgroundColor: "#414040" }}>
      <div className={`${styles.image} ${styles.shimmerBg}`}></div>
      <div className={`${styles.bodyContainer}`}>
        <div className={`${styles.title} ${styles.shimmerBg}`}></div>
        <div className={`${styles.subTitle} ${styles.shimmerBg}`}></div>
      </div>
    </Card>
  );
};

const ShimmerUICards = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 3 }}
      sx={{ backgroundColor: "#181818", padding: "0px 2rem" }}
    >
      {videoListMock?.map((video) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
            <CardWrapper />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ShimmerUICards;
