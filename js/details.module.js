import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();

    document.getElementById("btnClose").addEventListener("click", () => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector(".details").classList.add("d-none");
    });

    this.getDetails(id);
  }

  async getDetails(idGames) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f61a31743bmsh2c7741ba4dbe6dfp1ad1c8jsnc157e7eb792b",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Fetched Game Details Data:", data); // Add this log
      this.ui.displayDetails(data);
    } catch (error) {
      console.error("Failed to fetch game details:", error);
    } finally {
      loading.classList.add("d-none");
    }
  }
}






