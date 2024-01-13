import Header from "./Header";
import "./Landing.css";
import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import GenerePanel from "./GenrePanel";
import VideoCard from "./VideoCard";
import { useEffect, useState, useCallback } from "react";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import DialogButton from "./DialogButton";

export default function Landing() {
  const { enqueueSnackbar } = useSnackbar();
  const [videosList, setVideosList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterData, setFilterData] = useState({
    genre: [],
    ageRating: "",
    searchText: "",
  });
  const [noVideoFound, setNoVideoFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  let history = useHistory();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handelSearch = (e) => {
    setFilterData({ ...filterData, searchText: e.target.value });
  };
  const handelAgeRating = (e) => {
    let val = e.target.dataset.value;
    if (val === "Any Age Group") {
      setFilterData({ ...filterData, ageRating: "" });
    } else {
      setFilterData({ ...filterData, ageRating: val });
    }
  };
  const handelGenre = (e) => {
    let val = e.target.dataset.value;
    if (val === "All Genre") {
      setFilterData({ ...filterData, genre: [] });
      return;
    }
    console.log(filterData.genre);
    if (!filterData.genre.includes(val)) {
      setFilterData({ ...filterData, genre: [...filterData.genre, val] });
      return;
    } else {
      setFilterData({
        ...filterData,
        genre: filterData.genre.filter((g) => {
          return g !== val;
        }),
      });
    }
  };

  const getVideosBySort = useCallback((sortBy,unsortedList) => {
    let sortedList = [...unsortedList];
    if (sortBy === "releaseDate") {
      sortedList.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (sortBy === "viewCount") {
      sortedList.sort((a, b) => b.viewCount - a.viewCount);
    }
   return sortedList;
  },[]);

  const handleSort = (event) => {
    setSortBy(event.target.value);
    const sortedList = getVideosBySort(event.target.value,videosList);
    setVideosList(sortedList);
  };

  const getVideosByFilteredData = useCallback(async (sortBy,filteredData) => {
    try {
      let url = `${config.endpoint}/videos?`;
      if (filteredData.searchText !== "") {
        url += `title=${filteredData.searchText}`;
      }
      if (filteredData.genre.length > 0) {
        let genres = filteredData.genre;
        let genreString = "genres=";
        for (let i = 0; i < genres.length - 1; i++) {
          genreString += `${genres[i]},`;
        }
        genreString += genres[genres.length - 1];
        if (filteredData.searchText !== "") {
          url += `&${genreString}`;
        } else {
          url += genreString;
        }
      }
      if (filteredData.ageRating !== "") {
        if (filteredData.searchText !== "" || filteredData.genre.length > 0) {
          url += `&contentRating=${filteredData.ageRating}`;
        } else {
          url += `contentRating=${filteredData.ageRating}`;
        }
      }
      setIsLoading(true);
      const res = await axios.get(url);
      setIsLoading(false);
      setNoVideoFound(false);
      // console.log(res);
      const filteredVideosList = getVideosBySort(sortBy,res?.data?.videos);
      setVideosList(filteredVideosList);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setNoVideoFound(true);
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          " Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  },[enqueueSnackbar,getVideosBySort]);

  const postVideoUpload = async (formData) => {
    if (!validateData(formData)) return;
    const { videoLink, imageLink, title, genre, contentRating, releaseDate } =
      formData;
    let d = new Date(releaseDate);
    let dateString = `${d.getDate()} ${
      monthNames[d.getMonth()]
    } ${d.getFullYear()}`;
    let data = {
      videoLink: videoLink,
      title: title,
      genre: genre,
      contentRating: contentRating,
      releaseDate: dateString,
      previewImage: imageLink,
    };
    console.log(data);
    try {
      let url = `${config.endpoint}/videos`;
      await axios.post(url, data);
      handleClose();
      enqueueSnackbar("Video Uploaded Successfully", { variant: "success" });
      getVideosByFilteredData(sortBy, filterData);
    } catch (e) {
      console.log(e);
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };
  const validateData = (formData) => {
    const { videoLink, imageLink, title, genre, contentRating, releaseDate } =
      formData;
    if (
      videoLink === "" ||
      imageLink === "" ||
      title === "" ||
      genre === "" ||
      contentRating === "" ||
      releaseDate === ""
    ) {
      enqueueSnackbar("fields cannot be empty", { variant: "Warning" });
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //   getVideosBySort();
  // }, [sortBy,getVideosBySort]);
  useEffect(() => {
    getVideosByFilteredData(sortBy,filterData);
  }, [filterData,getVideosByFilteredData,sortBy]);
  return (
    <>
      <Header
        upload={
          <DialogButton
            postVideoUpload={postVideoUpload}
            open={open}
            setOpen={setOpen}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        }
      >
        <TextField
          sx={{
            backgroundColor: "#D4D2D2",
            borderRadius: "10px",
            color: "#1818185c ",
          }}
          className="searchBar search-desktop"
          placeholder="Search"
          variant="outlined"
          size="small"
          onChange={handelSearch}
          value={filterData.searchText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Header>
      <TextField
        sx={{
          backgroundColor: "#D4D2D2",
          borderRadius: "10px",
          color: "#1818185c ",
        }}
        className="search-mobile"
        placeholder="Search"
        variant="outlined"
        size="small"
        onChange={handelSearch}
        value={filterData.searchText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        fullWidth
      ></TextField>
      <GenerePanel
        handleSort={handleSort}
        sortBy={sortBy}
        filterData={filterData}
        handelAgeRating={handelAgeRating}
        handelGenre={handelGenre}
      />
      {isLoading ? (
        <Grid className="circular-progress-parent">
          <CircularProgress className="circular-progress" />
          <Typography variant="h6" sx={{ color: "#F3F4F8" }}>
            loading videos
          </Typography>
        </Grid>
      ) : (
        <Box>
          {noVideoFound ? (
            <Box className="no-products">
              <SentimentDissatisfied />
              <div>
                <Typography variant="h6" sx={{ color: "#F3F4F8" }}>
                  No Videos Found
                </Typography>
              </div>
            </Box>
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 3, lg: 3 }}
              sx={{ backgroundColor: "#181818", padding: "0px 2rem" }}
            >
              {videosList.map((video) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                    <VideoCard video={video} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
