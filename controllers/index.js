
const logger        = require('../lib/logger');

module.exports = function(express) {
  express.get('/', getRoot);
};

function getRoot(req, res) {
  logger.info('Url requested: /', req.baseUrl);
  res.status(200).send('Hello! I\'m the movie charades microservice');
}
