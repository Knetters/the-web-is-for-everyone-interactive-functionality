// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];

const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

const urls = [
  // Dashboard
  [url] + "/game/943.json",
  [url] + "/game/943/statistics.json",
  [url] + "/facts/Player/8607.json",
  [postUrl],
  [apiUrl]
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
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2, data3, data4, data5};
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
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2, data3, data4, data5};
  response.render('stats', data);
});

// Create a route for the index page
app.get('/teams', async function (request, response) {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2, data3, data4, data5};
  response.render('teams', data);
});

// Create a route for the team info page
app.get('/teamInfo', async function (request, response) {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2, data3, data4, data5};
  response.render('teamInfo', data);
});

app.post("//teamInfo", (request, response) => {
  request.body.answers = [
    {
      content: request.body.content,
      questionId: request.body.question,
    },
  ];
  postJson(postUrl, request.body).then((data) => {
    let newPlayer = { ...request.body };

    if (data.success) {
      response.redirect("/?memberPosted=true");
    } else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`;
      const newplayer = { error: errormessage, values: newPlayer };
      response.render("teamInfo", { newPlayer, data });
    }
  });
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