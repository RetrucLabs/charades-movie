
const logger        = require('../lib/logger');
const _             = require('underscore');
const validator     = require('validator');
const config        = require('../config/config');

module.exports = (express) => {
  express.get('/', getRoot);
  express.get('/films', preloadFilmsListParams, getFilmsList);
};

function getRoot(req, res) {
  logger.info('Url requested: /', req.baseUrl);
  res.status(200).send('Hello! I\'m the movie charades microservice');
}

function getFilmsList(req, res) {
  var films = _.shuffle(require('../lib/films.json')[res.locals.lang]);
  if(films.length < res.locals.outputLength) return res.status(400).send('Invalid param');
  films = films.splice(0, res.locals.outputLength);
  res.status(200).json(films);
}


/*
* Middleware functions
*/

function preloadFilmsListParams(req, res, next){
  if(req.query.ol && !validator.isNumeric(req.query.ol)) return res.status(400).send('Invalid param');
  else if(!req.query.ol) res.locals.outputLength = config.filmsListDefaultLength;
  else res.locals.outputLength = req.query.ol;

  if(req.query.lang && !(req.query.lang == 'es' || req.query.lang == 'en')) return res.status(400).send('Invalid param');
  else if(!req.query.lang) res.locals.lang = 'en';
  else res.locals.lang = req.query.lang;
  next();
}
