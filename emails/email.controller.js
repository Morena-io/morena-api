var connection = require('../db/connection');

function EmailController() {
  var self = {
    getAll: (res) => {
      // TODO add caching
      connection.acquire((err, con) => {
        var query = 'SELECT * FROM `email`';
        con.query(query, (err, results) => {
          con.release();

          if (err) {
            res.status(400);
            res.send({
              message: err.code,
              err: err
            });
            return;
          }

          res.status(200);
          res.statusMessage = 'Emails retreived successfully';
          res.send(results);
        });
      });
    },
    create: (email, res) => {
      console.log(email);
      // TODO add caching
      // TODO add check if email already exists in DB before trying to add
      connection.acquire((err, con) => {
        var query = 'INSERT INTO email SET ?';
        con.query(query, email, (err, results) => {
          con.release();

          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.status(200);
              res.statusMessage = 'Email already existed';
              res.send({
                email: email
              });
              return;
            }

            console.log(err);
            res.status(400);
            res.statusMessage = 'Email creation failed';
            res.send({
              message: err.code,
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
      })
    }
  };
  return self;
}

module.exports = EmailController();