;let movieNameRef = document.getElementById("movie-name");
let search_button = document.getElementById("search_button");
let results = document.getElementById("results");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
}