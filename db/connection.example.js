/**
 * Note: this is an example of how the connection.js file should be. You should create\
 * your own version matching your environment's credentials
 */
var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'YOUR_HOSTNAME',
      user: 'YOUR_USER',
      password: 'YOUR_PW',
      database: 'morena'
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
