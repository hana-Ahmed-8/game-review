import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
  constructor() {
    this.getGames("shooter"); // Default category

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    });

    this.ui = new Ui();
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
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
      console.log("Fetched Games Data:", data); // Add this log
      this.ui.displayDataGame(data);
      this.startEvent();
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      loading.classList.add("d-none");
    }
  }

  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.dataset.id;
        console.log("Clicked Game ID:", id); // Add this log
        this.showDetails(id);
      });
    });
  }

  showDetails(idGame) {
    console.log("Showing details for Game ID:", idGame); // Add this log
    new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}



