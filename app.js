const express = require('express');
const { get } = require('request');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./apiFunctions');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// api roots

// --- game operations ---

// get all games
app.get('/api/games', async (req, res) => {
    const games = await db.getAllGames();
    res.status(200).json({games});
});

// get game by id
app.get('/api/games/:id', async (req, res) => {
    const game = await db.getGameById(req.params.id);
    res.status(200).json({game});
});

// TODO: nicht fertig, testen
// create game
app.post('/api/games', async (req, res) => {
    const results = await db.createGame(req.body);
    res.status(201).json({id: results[0]});
});

// TODO: nichts fertig, testen
// update game
app.patch('/api/games/:id', async (req, res) => {
    const id = await db.updateGame(req.params.id, req.body);
    res.status(200).json({id});
});


// hard delete
// TODO: nicht fertig, testen
app.delete('/api/game:id', async (req, res) => {
    const result = await db.deleteGame(req.params.id);
    res.status(200).json({succcess: true});
});

// --- steamAPI --- //

// TODO: nicht fertig
// load data from steamAPI into game
app.patch('/api/steam-data-to-game/:id', async (req, res) => {
    // const id = await db.(req.params.id, req.body);
    res.status(200).json({id});
});


// --- genre operations --- //

// get all genre
app.get('/api/genre', async (req, res) => {
    const genres = await db.getAllGenre();
    res.status(200).json({genres});
});

app.get('/api/genre/:id', async (req, res) => {
    const genre = await db.getGenreById(req.params.id);
    res.status(200).json({genre});
})

// create genre
app.post('/api/create-genre', async (req, res) => {
    const results = await db.createGenre(req.body);
    res.status(200).json({results});
});

// add genre to game
// TODO: results überarbeiten
app.post('/api/add-genre-to-game', async (req, res) => {
    const results = await db.addGenreToGame(req.body);
    res.status(200).json({results});
});

// get genre from game by game_id
app.get('/api/get-genre-from-Game/:id', async(req, res) => {
    const genre = await db.getGenreFromGame(req.params.id);
    res.status(200).json({genre});
});

// remove genre from game
app.delete('/api/remove-genre-from-game', async (req, res) => {
    const results = await db.removeGenreFromGame(req.body);
    res.status(200).json({results});
});

// delete genre by id
app.delete('/api/delete-genre/:id', async (req, res) => {
    const results = await db.deleteGenre(req.params.id);
    res.status(200).json({results});
});

// --- publisher operations ---

app.get('/api/publisher', async (req, res) => {
    const results = await db.getAllPublisher();
    res.status(200).json({results})
});

app.get('/api/publisher/:id', async (req, res) => {
    const results = await db.getPublisherById(req.params.id);
    res.status(200).json({results})
});

app.post('/api/publisher', async (req, res) => {
    const results = await db.addPublisher(req.body);
    res.status(200).json({results})
});

app.delete('/api/publisher/:id', async (req, res) => {
    const results = await db.deletePublisher(req.params.id);
    res.status(200).json({results})
});

// get publisher from game id
app.get('/api/game-publisher-connection/:id', async (req, res) => {
    const results = await db.getPublisherFromGame(req.params.id);
    res.status(200).json({results})
});

// add publisher to game
app.post('/api/game-publisher-connection/', async (req, res) => {
    const results = await db.addPublisherToGame(req.body);
    res.status(200).json({results})
});

// remove publisher from game
app.delete('/api/game-publisher-connection/:id', async (req, res) => {
    const results = await db.removePublisherFromGame(req.params.id);
    res.status(200).json({results})
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));