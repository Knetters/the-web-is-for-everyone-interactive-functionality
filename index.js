// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];

const urls = [
  [url] + "/game/943.json",
  [url] + "/game/943/statistics.json",
  [url] + "/facts/Player/8607.json",
];

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static("public"));

// Create a route for the index page
app.get('/', async function (request, response) {
  const [data1, data2] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2};
  response.render('index', data);
});

// Create a route for the player info page
app.get('/playerInfo/:id', (request, response) => {
  let playerId = request.params.id;
  let playerInfoUrl = baseURL + 'facts/Player/' + playerId + '.json';
  fetchJson(playerInfoUrl).then((data) => {
    response.render('playerInfo', {data: data});
  });
});

// Create a route for the index page
app.get('/stats', async function (request, response) {
  const [data1, data2] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2};
  response.render('stats', data);
});

// Create a route for the index page
app.get('/teams', async function (request, response) {
  const [data1, data2] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2};
  response.render('teams', data);
});


// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application available on: http://localhost:${port}`);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}