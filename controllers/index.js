
const logger        = require('../lib/logger');
const _             = require('underscore');
const validator     = require('validator');
const config        = require('../config/config');

module.exports = (express) => {
  express.get('/', getRoot);
  express.get('/films', getFilmsList);
};

function getRoot(req, res) {
  logger.info('Url requested: /', req.baseUrl);
  res.status(200).send('Hello! I\'m the movie charades microservice');
}

function getFilmsList(req, res) {
  var outputLength = req.query.ol;
  if(outputLength && !validator.isNumeric(req.query.ol)) return res.status(400).send('Invalid param');
  if(!outputLength) outputLength = config.filmsListDefaultLength;
  var films = _.shuffle(require('../lib/films.json'));
  if(films.length > outputLength) films = films.splice(0, outputLength);
  res.status(200).json(films);
}
