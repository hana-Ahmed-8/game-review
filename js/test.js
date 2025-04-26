// This is to test the API fetch directly
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'f61a31743bmsh2c7741ba4dbe6dfp1ad1c8jsnc157e7eb792b', // Working key
    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
  }
};

async function testApi() {
  try {
    const res = await fetch(url, options);
    const games = await res.json();
    console.log("Fetched games:", games);  // Logs fetched data

    // Testing game data
    const container = document.getElementById("gameData");
    if (!container) return;

    container.innerHTML = games.slice(0, 10).map(game => `
      <div class="col">
        <div class="card h-100 bg-dark text-white p-2">
          <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
          <div class="card-body">
            <h5 class="card-title">${game.title}</h5>
            <p class="card-text">${game.short_description}</p>
            <span class="badge bg-info">${game.genre}</span>
            <span class="badge bg-warning text-dark">${game.platform}</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Fetch error:", err);  // Logs any fetch errors
  }
}

testApi();  // Run the function to test the API

