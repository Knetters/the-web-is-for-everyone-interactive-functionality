// Import the required modules.
import express from "express";
import fetch from "node-fetch";

// Create a new Express app.
const app = express();

// The API's.
const url = "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api";

const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players?first=100";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

// All different url's for the API.
const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

// Wait for all the data to load and map it.
const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
// Combine the url into one data type to send in the view.
const data = {data1, data2, data3, data4, data5};

// Set EJS as the template engine and specify the views directory.
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static("public"));


// Create a route for the index page
app.get('/', async function (request, response) {
  // render the index page with the data from the API
  response.render('index', data);
});

// Create a route for the player info page
app.get('/playerInfo/:id', (request, response) => {
  // Define the player id
  let playerId = request.params.id;
  // Make a url with the player id
  let playerInfoUrl = url + 'facts/Player/' + playerId + '.json';
  // Fetch the data from the player.
  fetchJson(playerInfoUrl).then((data) => {
    // Render the playerInfo and the data.
    response.render('playerInfo', {data: data});
  });
});

// Create a route for the index page
app.get('/stats', async function (request, response) {
  // Render the stats with the data.
  response.render('stats', data);
});

// Create a route for the index page
app.get('/teams', async function (request, response) {
  // Render the teams with the data.
  response.render('teams', data);
});

// Create a route for the team info page
app.get('/teamInfo', async function (request, response) {
  // Render the teamInfo with the data.
  response.render('teamInfo', data);
});

// Handle form submission
app.post('/postPlayerInfo', async function  (request, response) {
  // Extract the form data from the request body
  const { name, gender, jerseyNumber, team, question, content } = request.body;
  
  // Construct the request body in the desired format
  const requestBody = {
    "name": name,
    "gender": gender,
    "jerseyNumber": jerseyNumber,
    "team": team,
    "answers": [
      {
        "content": content,
        "questionId": question
      }
    ]
  };
  
  // Make a POST request to the API endpoint
  const postResponse = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Wait for all the data to load and map it.
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  // Combine the url into one data type to send in the view.
  const data = {data1, data2, data3, data4, data5};

  postJson(url, request.body).then((data) => {
    // If the post is succes, render this
    if (data.message == 'Succes') {
      response.redirect(`/teamInfo/?Posted=true`)
    // If not, render this
    } else {
      response.redirect(`/teamInfo/?Posted=false`)
    }
  })
})

// -------------------- Start local host ---------------------

// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`

  ░██████╗███████╗██████╗░██╗░░░██╗███████╗██████╗░  ██████╗░███████╗░█████╗░██████╗░██╗░░░██╗
  ██╔════╝██╔════╝██╔══██╗██║░░░██║██╔════╝██╔══██╗  ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗░██╔╝
  ╚█████╗░█████╗░░██████╔╝╚██╗░██╔╝█████╗░░██████╔╝  ██████╔╝█████╗░░███████║██║░░██║░╚████╔╝░
  ░╚═══██╗██╔══╝░░██╔══██╗░╚████╔╝░██╔══╝░░██╔══██╗  ██╔══██╗██╔══╝░░██╔══██║██║░░██║░░╚██╔╝░░
  ██████╔╝███████╗██║░░██║░░╚██╔╝░░███████╗██║░░██║  ██║░░██║███████╗██║░░██║██████╔╝░░░██║░░░
  ╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝  ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░

  Application available on: http://localhost:${port}
  `);
});

// Wait untill the data exists end fetches the data.
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

// Wait untill the data exists and posts the data. 
export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}