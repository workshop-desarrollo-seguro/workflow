var mysql = require('mysql');
var express = require('express')
const app = express()
const port = 3000

var con = mysql.createConnection({
    host: "localhost",
    user: "workshop",
    password: "123456",
    database: "workshop"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  app.get('/', (req, res) => {
    res.status(200).send('Blog increible!');
  })
  
  app.get('/api/posts', function(request,response) {
    con.query('SELECT * FROM post', function(err, rows, fields) {
      if (err) {
        return response.send(500, err.message);
      }
      thedata = ({'Result' : rows});
      return response.status(200).send(thedata);
    });
  });

  app.get('/api/post/:id', function(request,response) {
    con.query('SELECT * FROM post where id = ' + request.params.id, function(err, rows, fields) {
      if (err) {
        return response.send(500, err.message);
      }
      thedata = ({'Result' : rows});
  
      return response.status(200).send(thedata);
    });
  });

  app.get('/api/postSeguro/:id', function(request,response) {
    con.query('SELECT * FROM post where id = ?' ,[request.params.id], function(err, rows, fields) {
      if (err) {
        return response.send(500, err.message);
      }
      thedata = ({'Result' : rows});
  
      return response.status(200).send(thedata);
        
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 
