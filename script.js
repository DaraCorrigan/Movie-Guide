// let NameRef = document.getElementById("name");
// let searchBtn = document.getElementById("search_button");
// let results = document.getElementById("results");


// let get = () => {
//     let Name = NameRef.value;
//     let url = `http://www.omdbapi.com/?t=${Name}&apikey=${key}`;

//     if (Name.length <= 0) {
//         results.innerHTML = `<h3 class="msg">Please enter a movie or TV show name </h3>`;
//     }

//     else {
//         fetch(url).then((resp) => resp.json()).then((data) => {
            
//             if (data.Response == "True") {
//                 results.innerHTML = `
//                     <div class="info">
//                         <img src=${data.Poster} class="poster">
//                         <div>
//                             <h2>${data.Title}</h2>
//                             <div class="rating">
//                                 <img src="star.svg">
//                                 <h4>${data.imdbRating}</h4>
//                             </div>
//                             <div class="details">
//                                 <span>${data.Rated}</span>
//                                 <span>${data.Year}</span>
//                                 <span>${data.Runtime}</span>
//                             </div>
//                             <div class="genre">
//                                 <div>${data.Genre.split(",").join("</div><div>")}</div>
//                             </div>
//                         </div>
//                     </div>
//                     <h3>Plot:</h3>
//                     <p>${data.Plot}</p>
//                     <h3>Cast:</h3>
//                     <p>${data.Actors}</p>
//                 `;
//             }

//             else {
//                 results.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
//             }
//         })
//             .catch(() => {
//                 results.innerHTML = `<h3 class="msg">An error has occured</h3>`;
//             });
//     }
// };

// searchBtn.addEventListener("click", get);
// window.addEventListener("load", get);

let NameRef = document.getElementById("name");
let searchBtn = document.getElementById("search_button");
let results = document.getElementById("results");

let get = () => {
    let Name = NameRef.value.trim();
    let url = `http://www.omdbapi.com/?s=${Name}&apikey=${key}`;

    if (Name.length <= 0) {
        results.innerHTML = `<h3 class="msg">Please enter a movie or TV show name</h3>`;
    } else {
        fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                return resp.json();
            })
            .then((data) => {
                if (data.Response === "True") {
                    let movies = data.Search;
                    results.innerHTML = '';

                    movies.forEach(movie => {
                        let movieUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${key}`;
                        
                        fetch(movieUrl)
                            .then(resp => resp.json())
                            .then(movieData => {
                                results.innerHTML += `
                                    <div class="info card">
                                        <div class="poster-container">
                                            <img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'default_poster.jpg'}" class="poster" alt="Poster">
                                        </div>
                                        <div class="card-content">
                                            <h2>${movieData.Title}</h2>
                                            <p>Type: ${movieData.Type}</p>
                                            <p>Year: ${movieData.Year}</p>
                                            <div class="rating">
                                                <img src="star.svg" alt="Star">
                                                <h4>${movieData.imdbRating}</h4>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            })
                            .catch(error => {
                                console.error('Error fetching movie details:', error);
                            });
                    });
                } else {
                    results.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                results.innerHTML = `<h3 class="msg">Error Occurred: ${error.message}</h3>`;
            });
    }
};

searchBtn.addEventListener("click", get);
window.addEventListener("load", get);