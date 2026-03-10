const express = require('express');
const { db, Song } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON
app.use(express.json());
// Test database connection
async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

// GET /api/songs - Get all songss
app.get('/api/songs', async (req, res) => {
    try {
        const songs = await Song.findAll();
        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});

// GET /api/songs/:id - Get song by ID
app.get('/api/songs/:id', async (req, res) => {
    try {
        const song = await
    Song.findByPk(req.params.id);
    
        if (!song) {
            return res.status(404).json({ error: 
        'Song not found' });
        }
    
        res.json(song);
    } catch (error) {
        console.error('Error fetching song:', error);
        res.status(500).json({ error: 'Failed to fetch song' });
    }
});

// POST /api/songs - Create new song
app.post('/api/songs', async (req, res) => {
    try {
        const { songTitle, artistName, albumName, genre, duration,
            releaseYear} = req.body;
    
        const newSong = await Song.create({
            songTitle,
            artistName,
            albumName,
            genre,
            duration,
            releaseYear
        });
    
        res.status(201).json(newSong);
    } catch (error) {
        console.error('Error creating song:', error);
        res.status(500).json({ error: 'Failed to create song' });
    }
});

// PUT /api/songs/:id - Update existing song
app.put('/api/songs/:id', async (req, res) => {
    try {
        const { songTitle, artistName, albumName, genre, duration,
            releaseYear } = req.body;
    
        const [updatedRowsCount] = await Song.update(
            { songTitle, artistName, albumName, genre, duration,
            releaseYear },
            { where: { id: req.params.id } }
        );
    
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 
        'Song not found' });
        }
    
        const updatedSong = await
    Song.findByPk(req.params.id);
        res.json(updatedSong);
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).json({ error: 'Failed to update song' });
    }
});

// DELETE /api/songs/:id - Delete song
app.delete('/api/songs/:id', async (req, res) => {
    try {
        const deletedRowsCount = await
    Song.destroy({
            where: { id: req.params.id }
        });
    
        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 
        'Song not found' });
        }
    
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ error: 'Failed to delete song' });
  }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});