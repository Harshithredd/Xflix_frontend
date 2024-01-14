export const validateData = (formData) => {
  const { videoLink, imageLink, title, genre, contentRating, releaseDate } =
    formData;
  return !(
    videoLink === "" ||
    imageLink === "" ||
    title === "" ||
    genre === "" ||
    contentRating === "" ||
    releaseDate === ""
  );
};
