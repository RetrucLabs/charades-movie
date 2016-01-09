module.exports = {

  server: {
    port: process.env.PORT || 8080,
    ip: process.env.IP || '0.0.0.0',
  },

  logFilePath: (process.env.HOME || process.env.USERPROFILE) + '/node-logs.log',

  currentTimeZone: 'Europe/Madrid',

  filmsListDefaultLength: 5
};
