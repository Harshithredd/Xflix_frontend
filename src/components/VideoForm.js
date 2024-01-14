import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./VideoForm.css";
import { useEffect } from "react";
let genreArray = ["Education", "Sports", "Movies", "Comedy", "Lifestyle"];
let contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"];

export default function VideoForm({setValues,values,handelInputChanges}) {
  useEffect(() => {
   setValues({});
  }, [setValues]);

  return (
    <div className="formWrapper">
      <TextField
        variant="outlined"
        label="Video Link"
        name="videoLink"
        value={values?.videoLink}
        helperText="This link will be used to derive the video"
        onChange={handelInputChanges}
        required
      />
      <TextField
        variant="outlined"
        name="imageLink"
        label="Thumbnail Image Link"
        value={values?.imageLink}
        helperText="This link will be used to preview the thumbnail image"
        onChange={handelInputChanges}
        required
      />
      <TextField
        variant="outlined"
        name="title"
        label="Title"
        value={values?.title}
        helperText="The title will be the representative text for video"
        onChange={handelInputChanges}
        required
      />
      <FormControl>
        <InputLabel id="select-genre">Genre</InputLabel>
        <Select
          labelId="select-genre"
          name="genre"
          value={values?.genre}
          label="Genre"
          onChange={handelInputChanges}
          required
        >
          {genreArray.map((g) => {
            return (
              <MenuItem value={g} key={g}>
                {g}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>
          Genre will help in categorizing your videos
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ margin: "0.5rem 0px" }}>
        <InputLabel id="select-age">Suitable age group for the clip</InputLabel>
        <Select
          labelId="select-age"
          name="contentRating"
          value={values?.contentRating}
          label="Suitable age group for the clip"
          onChange={handelInputChanges}
          required
        >
          {contentRatingArray.map((age) => {
            return (
              <MenuItem value={age} key={age}>
                {age}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>
          This will be used to filter videos on age group suitability
        </FormHelperText>
      </FormControl>
      <TextField
        variant="outlined"
        name="releaseDate"
        label="Release Date"
        value={values?.releaseDate}
        type="date"
        helperText="This will be used to sort videos"
        onChange={handelInputChanges}
        required
      />
    </div>
  );
}
