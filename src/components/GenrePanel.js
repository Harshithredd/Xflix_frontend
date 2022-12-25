import {FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./GenrePanel.css"
import React from "react";
export default function GenerePanel(props){
    let genreArray =["Education", "Sports", "Movies", "Comedy", "Lifestyle"];
    let contentRatingArray =["Anyone", "7+", "12+", "16+", "18+"]
    return(
        <div>
            <div className= "chips-contaier-genre">
                {genreArray.map(g =>{
                    let dataValue =g;
                    return(
                        <div className={ props.filterData.genre.includes(dataValue) ? "chips chips-active" : "chips"}
                        data-value={dataValue} 
                        onClick={props.handelGenre}
                        key={g}>{g}</div>
                    )
                })}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-filled-label">Sort By</InputLabel>
                    <Select
                        sx={{color:"white"}}
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={props.sortBy}
                        onChange={props.handleSort}
                        label="Sort By"
                        
                    >
                        <MenuItem value="releaseDate">Release Date</MenuItem>
                        <MenuItem value="viewCount">View Count</MenuItem>
                    </Select>
                </FormControl>
                       
            </div>
            <div className= "chips-contaier-genre" style={{paddingBottom:"2rem"}}>
                {contentRatingArray.map(rating=>{
                    let dataValue = rating.replace("+","%2B");
                    if(rating === "Anyone"){
                        dataValue ="";
                    }
                    return(
                        <div className={ dataValue === props.filterData.ageRating ? "chips chips-active" : "chips"}
                        data-value={dataValue} 
                        onClick={props.handelAgeRating} 
                        key={rating}>{rating}</div>
                    )
                })}  
            </div>
        </div>
    );
}