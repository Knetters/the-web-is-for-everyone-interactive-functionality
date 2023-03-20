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