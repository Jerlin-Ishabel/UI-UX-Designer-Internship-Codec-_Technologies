function searchMovie() {
  const query = document.getElementById("searchBox").value;
  const apiKey = '9636d644'; // 👉 Get it from http://www.omdbapi.com/apikey.aspx

  fetch(`https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        document.getElementById("movieInfo").innerHTML = `
          <h2>${data.Title} (${data.Year})</h2>
          <img src="${data.Poster}" alt="${data.Title}" height="300">
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>IMDB Rating:</strong> ${data.imdbRating}/10</p>
        `;
      } else {
        document.getElementById("movieInfo").innerHTML = `<p>Movie not found!</p>`;
      }
    });
}
