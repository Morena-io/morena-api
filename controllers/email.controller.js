var connection = require('../connection');

function EmailController() {
  this.getAll = (res) => {
    // TODO add caching
    connection.acquire((err, con) => {
      con.query('SELECT * FROM emails', (err, results) => {
        con.release();
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
          res.send({
            message: 'Email creation failed',
            err: err
          });
        } else {
          email.id = results.insertId;
          res.send({
            message: 'Email created successfully',
            email: email
          });
        }
      });
    });
  };
}

module.exports = new EmailController();