// const playerCards = document.querySelectorAll(".player-card");
// const playerInfoContainer = document.getElementById("player-info-container");
// const pointsContainer = document.getElementById("points-container");

// const playerHTML = `
//   <section class='insertedContent player-data-container'>
//     <h3 class="player-name">Speler naam</h3>
//     <p class="close-icon"><i id="close-btn" class="fa fa-close"></i></p>
//     <h3>Player stats</h3>
//   </section>
// `;

// playerCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     const insertedContent = document.querySelector(".insertedContent");
//     if (insertedContent) {
//       insertedContent.parentNode.removeChild(insertedContent);
//     }
     
//     playerInfoContainer.insertAdjacentHTML("afterend", playerHTML);
    
//     const close_BTN = document.getElementById("close-btn");
//     close_BTN.addEventListener("click", () => {

//       const insertedContent = document.querySelector(".insertedContent");
//       if (insertedContent) {
//         insertedContent.parentNode.removeChild(insertedContent);
//         pointsContainer.classList.toggle("active");
//       }
//     });
//     if (!pointsContainer.classList.contains("active")) {
//         pointsContainer.classList.add("active");
//     }
//   });
// });

let initialTheme = true;
const darkButton = document.querySelector('.darkmode')
const darkText = document.getElementById("darkmode-btn-text")

darkButton.addEventListener ('click', toggleDarkMode);

function toggleDarkMode() {
    const root = document.documentElement;

    if (initialTheme) {
        root.style.setProperty('--black', '#000000');
        root.style.setProperty('--panelBackgroundColor', '#ffffff59');
        root.style.setProperty('--BGgradient', 'linear-gradient(90deg, rgba(255,255,255,0) 0%, #1682e7 0%, #76c28c 80%)');
        darkText.innerHTML = "Dark"
        initialTheme = false;
    } else {
        root.style.setProperty('--black', '#fff');
        root.style.setProperty('--panelBackgroundColor', '#66666659');
        root.style.setProperty('--BGgradient', 'linear-gradient(90deg, rgba(255,255,255,0) 0%, #030c15 0%, #132333 80%)');
        darkText.innerHTML = "Light"
        initialTheme = true;
    }
}