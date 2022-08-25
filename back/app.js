const express = require('express');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const morgan  = require('morgan');
const winston = require('./config/winston.js')
const mongoose = require('mongoose');
const cookieParser  =  require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config() 

const userRoutes = require('./routes/user.js')
const publicationRoutes = require('./routes/publication.js')

const path = require('path');

const app = express();

const limit = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
})

mongoose.connect(`mongodb+srv://${process.env.USR}:${process.env.PASSWRD}@cluster0.iuqwlzh.mongodb.net/?retryWrites=true&w=majority`, //User et Mdp devrais etre dans une variable d'environement
{
    useUnifiedTopology: true
})
.then(() => console.log("Connexion reussi"))
.catch((error) => console.log(`Connexion echouer ${process.env.USR} ${process.env.PASSWRD}`))


app.use(helmet())
app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Cross-Origin-Resource-Policy", "cross-orgin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });

app.use(cookieParser())
app.use(morgan('combined', {stream: winston.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/", limit);
app.use('/api/auth', userRoutes);
app.use('/api/publication', publicationRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;