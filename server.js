// Import database setup utils
const createDB = require('./database/utils/createDB');
const seedDB = require('./database/utils/seedDB');

// Import express library
const express = require('express');

// Create express server
const app = express();

// Express router: import routes we defined
const apiRouter = require('./routes');

// Initialize express server
const cors = require('cors');

// Import Sequelize instance
const db = require('./database');

// Sync and seed
const syncDatabase = async () => {
    try {
        await db.sync({force: true});
        console.log('------Synced to db--------')
        await seedDB();
        console.log('--------Successfully seeded db--------');
    }   catch (err) {
        console.error('syncDB error:', err);
    }  
};

const configureApp = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Ignore browser requests for favicon file
    app.get('/favicon.ico', (req, res) => res.status(204));

    // Define a route
    app.get("/hello", (request, response) => {
        response.send("hello world!")
    });

    // Mount apiRouter
    app.use("/api", apiRouter);

    // Handle page not found:
    app.use((req, res, next) => {
        const error = new Error("Not Found, Please Check URL!");
        error.status = 404;
        next(error);
    });
  
    // Error-handling middleware
    app.use((err, req, res, next) => {
        console.error(err);
        console.log(req.originalUrl);
        res.status(err.status || 500).send(err.message || "Internal server error.");
    });
};

// Function to boot the server
const bootApp = async () => {
    // Creates local database if it doesn't exist
    await createDB();

    // Calls sync which is a Sequelize method that creates the database tables
    // Calls seedDB which will insert initial data into the tables
    await syncDatabase();

    // Express setup - define routes and middleware
    await configureApp();
};

// PROGRAM STARTS HERE
bootApp();

// Ports
const PORT = 5001;
app.listen(PORT, console.log(`Server started on ${PORT}`));
