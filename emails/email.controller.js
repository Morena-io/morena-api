var connection = require('../db/connection');

function EmailController() {
  this.getAll = (res) => {
    // TODO add caching
    connection.acquire((err, con) => {
      con.query('SELECT * FROM emails', (err, results) => {
        con.release();
        res.status(200);
        res.statusMessage = 'Emails retreived successfully';
        res.send(results);
      });
    });
  };

  this.create = (email, res) => {
    email.isPreLaunch = true;
    console.log(email);
    // TODO add caching
    connection.acquire((err, con) => {
      con.query('INSERT INTO emails SET ?', email, (err, results) => {
        con.release();
        if (err) {
          res.status(400);
          res.statusMessage = 'Email creation failed';

          var message = err.code;
          if (err.code === 'ER_DUP_ENTRY') {
            var message = 'Duplicate email entry';
          }

          res.send({
            message: message,
            err: err
          });
          return;
        }

        email.id = results.insertId;
        res.status(200);
        res.statusMessage = 'Email created successfully';
        res.send({
          email: email
        });
      });
    });
  };
}

module.exports = new EmailController();