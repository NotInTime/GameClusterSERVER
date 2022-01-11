const express = require('express');
const { get } = require('request');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/apiFunctions');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // ursprüglich false
app.use(cors());

// api roots

// get all games
app.get("api/games", async (req, res) => {
    const games = await db.getAllGames();
    res.status(200).json({games});
});

// create game
app.post('/api/games', async (req, res) => {
    const results = await db.createGame(req.body);
    res.status(201).json({id: results[0]});
});

// update game
app.patch('/api/games/:id', async (req, res) => {
    const id = await db.updateGame(req.params.id, req.body);
    res.status(200).json({id});
});

//softdelete
app.delete('/api/game:id', async (req, res) => {
    const result = await db.deleteGame(req.params.id);
    res.status(200).json({succcess: true});
});

// get all genre
app.get('/api/genre', async (req, res) => {
    const genre = await db.getAllGenre();
    res.status(200).json({genre});
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));