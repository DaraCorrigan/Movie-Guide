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
let popup = document.getElementById("popup");
let popupDetails = document.querySelector(".popup-details");
let closeButton = document.querySelector(".close-button");

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
                                let card = document.createElement('div');
                                card.classList.add('info', 'card');
                                card.innerHTML = `
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
                                `;

                                card.addEventListener('click', () => showPopup(movieData));

                                results.appendChild(card);
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

let showPopup = (movieData) => {
    popupDetails.innerHTML = `
        <h2>${movieData.Title}</h2>
        <p><strong>Type:</strong> ${movieData.Type}</p>
        <p><strong>Year:</strong> ${movieData.Year}</p>
        <p><strong>Rating:</strong> ${movieData.imdbRating}</p>
        <p><strong>Genre:</strong> ${movieData.Genre}</p>
        <p><strong>Director:</strong> ${movieData.Director}</p>
        <p><strong>Actors:</strong> ${movieData.Actors}</p>
        <p><strong>Plot:</strong> ${movieData.Plot}</p>
        <div class="poster-container">
            <img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'default_poster.jpg'}" class="poster" alt="Poster">
        </div>
    `;
    popup.style.display = 'flex';
};

let closePopup = () => {
    popup.style.display = 'none';
};

searchBtn.addEventListener("click", get);
window.addEventListener("load", get);
closeButton.addEventListener("click", closePopup);
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        closePopup();
    }
});



