;let movieNameRef = document.getElementById("movie-name");
let search_button = document.getElementById("search_button");
let results = document.getElementById("results");

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if(movieName.length <= 0){
        results.innerHTML = `<h3 class="msg">Please enter a movie or tv show </h3>`;
    }

    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            
            if (data.Response == "True") {
                results.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            else {
                results.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            .catch(() => {
                results.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

search_button.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);