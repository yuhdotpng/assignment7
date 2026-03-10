const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();
const db = new Sequelize({ 
    dialect: 'sqlite', 
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db', 
    logging: console.log // Not necessary, but shows SQL queries in the console 
})
async function setupDatabase() { 
    try { 
        await db.authenticate(); 
        console.log('Connection to databaseestablished successfully.'); 

        await db.sync({ force: true })
        console.log('Database file created at:',`database/${process.env.DB_NAME}`); 

        await db.close(); 
    } catch (error) { 
         console.error('Unable to connect to the database:', error); 
    } 
}
const Song = db.define('Song',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
       //write duration in only seconds
        type: DataTypes.INTEGER
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
})


// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}

module.exports = {db, Song};