import { config } from "../App";
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import Header from "./Header"
import "./VideoPage.css"
import axios from "axios";
import { useSnackbar } from "notistack";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { SentimentDissatisfied } from "@mui/icons-material";
import VideoCard from "./VideoCard";
import { getMonths } from "./VideoCard";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VideoPage(props){
    const [video,setVideo] =useState({votes:"", videoLink:"youtube.com/embed/nx2-4l4s4Nw"});
    const {enqueueSnackbar} = useSnackbar();
    const [videosList,setVideosList] = useState([]);
    const [noVideoFound,setNoVideoFound]= useState(false);
    const [isLoading,setIsLoading] = useState(false);
    
    const param = window.location.href.split("/")[4];
    const[url,setUrl] = useState(param);
    let dateString = getMonths(video.releaseDate);

    const handelUrl = ()=>{
        let currentId = window.location.href.split("/")[4];
        setUrl(currentId);
       // console.log("inside handel url ",currentId);
        updateViews();
    }

    const getVideo =async(id) =>{
        try{
            let urlString =`${config.endpoint}/videos/${id}`;
            // console.log("get videos",id);
            const res= await axios.get(urlString);
            console.log(res);
            setVideo(res.data)
        }catch(e){
            console.log(e)
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
    }
    const updateVotes =async(id,typeVote) =>{
        let data = {
            "vote": typeVote,
            "change": "increase"
        }
        try{
            let url =`${config.endpoint}/videos/${id}/votes`;
           // console.log(url,data);
            const res= await axios.patch(url,data)
            console.log(res);
            setVideo(res.data)
        }catch(e){
            console.log(e)
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
    }
    const getAllVideos=async()=>{
        try{ 
            let url =`${config.endpoint}/videos`;
            setIsLoading(true);
            console.log(url);
            const res= await axios.get(url);
            setIsLoading(false);
            setNoVideoFound(false);
            console.log(res);
            setVideosList(res.data.videos)
        }catch(e){
            setIsLoading(false);
            console.log(e)
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
    }

    const updateViews =async() =>{
        try{
            let url =`${config.endpoint}/videos/${video._id}/views`;
            console.log(url);
            const res= await axios.patch(url);
            console.log(res);
           // setVideo(res.data)
        }catch(e){
            console.log(e)
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
    }
    useEffect(()=>{
        getVideo(param);
        getAllVideos();
    },[])
    useEffect(()=>{
        getVideo(url);
        window.scrollTo(0, 0);
    },[url])
   
    // useEffect(()=>{
    //     updateVotes();
    // },[video])
    return(
        <>
        <Header/>
        <Box className="videoPage-container">
            <div className="videoWrapper">
                <iframe 
                    src={`http://www.${video.videoLink}`}
                    allow="accelerometer; autoplay ;clipboard-write; encrypted-media, gyroscpoe, picture-in-picture "
                    allowFullScreen
                />
            </div>
            <div className="videoText">
                <div>   
                    <Typography variant='h6' component="div" color="white">{video.title}</Typography>
                    <Typography variant='body2' color="silver">
                     <VisibilityIcon fontSize="small" sx={{position:"relative",top:"0.3rem"}}/>
                    &nbsp;{video.viewCount}&nbsp; | &nbsp;{video.contentRating}&nbsp;&nbsp; | &nbsp;&nbsp;{dateString}
                    </Typography>
                </div>
                <div>
                    <Button variant="contained" size="small" sx={{marginRight:"1rem",backgroundColor:"black"}}
                    onClick={e=>{updateVotes(video._id,"upVote")}}
                    >
                        <ThumbUpAltIcon/>&nbsp; {video.votes.upVotes}
                    </Button>
                    <Button variant="contained" size="small" sx={{backgroundColor:"black"}}   
                    onClick={e=>{updateVotes(video._id,"downVote")}} 
                    >
                        <ThumbDownAltIcon/>&nbsp; {video.votes.downVotes}
                    </Button>
                </div>
            </div>
            <div className="horizontalLine"></div>
            <div>
            {
                isLoading ? 
                (<Grid className="circular-progress-parent">
                    <CircularProgress className="circular-progress"/>
                    <Typography variant="h6" sx={{color:"#F3F4F8"}}>loading videos</Typography>
                </Grid>) 
                :   (<Box>
                        {   noVideoFound ?
                                (<Box className="no-products">
                                    <SentimentDissatisfied/>
                                    <div>
                                        <Typography variant="h6" sx={{color:"#F3F4F8"}}>No Videos Found</Typography>
                                    </div>     
                                </Box>)
                            : (<Grid container spacing={{ xs: 2, md: 3, lg:3 }} 
                                sx={{backgroundColor:"#181818", padding:"0px 2rem"}} 
                                >
                                {videosList.map((video)=>{
                                   return(
                                    <Grid item xs={12} sm={6} md ={4} lg={3} key={video._id}>
                                        <VideoCard video={video} handelUrl={handelUrl}/>
                                    </Grid>
                                   ) 
                                })}
                                </Grid>)
                        }
                    </Box>) 
            }
            </div>
            

            
        </Box>
        
        </>
    )
}
