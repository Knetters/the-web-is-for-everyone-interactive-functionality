// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const url = "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api";

const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

// All different url's for the API
const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
const data = {data1, data2, data3, data4, data5};

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static("public"));


// Create a route for the index page
app.get('/', async function (request, response) {
  response.render('index', data);
});

// Create a route for the player info page
app.get('/playerInfo/:id', (request, response) => {
  let playerId = request.params.id;
  let playerInfoUrl = url + 'facts/Player/' + playerId + '.json';
  fetchJson(playerInfoUrl).then((data) => {
    response.render('playerInfo', {data: data});
  });
});

// Create a route for the index page
app.get('/stats', async function (request, response) {
  response.render('stats', data);
});

// Create a route for the index page
app.get('/teams', async function (request, response) {
  response.render('teams', data);
});

// Create a route for the team info page
app.get('/teamInfo', async function (request, response) {
  response.render('teamInfo', data);
});

// Handle form submission
app.post('/teamInfo', async function (request, response) {
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

  // Fetch the data again
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2, data3, data4, data5};

  console.log(data)
  
  // Render the teamInfo view with the new data
  response.render('teamInfo', data);
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

export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}