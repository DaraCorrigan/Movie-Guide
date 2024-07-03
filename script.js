;let movieNameRef = document.getElementById("movie-name");
let search_button = document.getElementById("search_button");
let results = document.getElementById("results");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if(movieName.length <= 0){
        results.innerHTML = `<h3 class="msg">Please enter a movie or tv show </h3>`;
    }

}