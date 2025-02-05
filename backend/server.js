// Loading Express
const express = require('express');

// Creating the express app instance
const app = express();

// Loading DotEnv for my environment variables
const dotenv = require('dotenv');
// Loading the DotEnv Config
dotenv.config();

// Loading the logger config file
const  logger = require('./logger')

// Loading helmet for an extra layer of security
const helmet = require('helmet')
app.use(helmet())

// Loading compression to improve performance
const compression = require('compression');

// Setting up compression
app.use(compression({
    // Do not compress if less than 1kb
    threshold: 1024,
    filter: (req, res) => req.headers['accept']?.includes('application/json')
}));

// Loading CORS
const cors = require('cors');
app.use(cors());

// Using Logger to "log" the server starting message
logger.info('Server Starting')

// Loading Morgan
const morgan = require('morgan');

// Setting Morgan in conjunction with logger
const stream = {
    write: (message) => logger.info(message.trim())
};
app.use(morgan('combined', { stream })); 

// Setting up the express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Loading the PORT env
const PORT = process.env.PORT || 6969;
if(!PORT){
    // Log a warning if PORT was not defined in the environment variables
     logger.warn("Port not defined on .env file")
}

// Set up the routes
const routes = require('./src/routes');
app.use("/api", routes);

// Global Error Middleware
app.use((err, req, res, next)=>{
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, { stack: err.stack });
    res.status(err.status || 500).json({
        success:false,
        error:err.message || "Internal Server Error"
    });
});

// Finally Ser the server to listen on the assigned port
app.listen(PORT, ()=>{
  logger.info(`Server Running on port ${PORT}`)
});

// Server shutdown signal (signal interrupt)
process.on("SIGINT", ()=>{
    logger.info("Server shutting down");
    process.exit(0);
})

// NGL Looking cool, took me a while but I think it's solid, thoughts?