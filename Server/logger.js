const express   = require('express');
const app       = express();
const MongoDB   = require('mongodb').MongoClient;

const DATABASE_URL      = 'mongodb://localhost:27017/virtualfence';

app.get('/log', (req, res) => {  
  var fetchLOG = (database, callback) => {
    database.collection('log').find().sort({"date": -1}).limit(1000).toArray(callback); 
  };
  
  MongoDB.connect(DATABASE_URL, (error, database) => {
    fetchLOG(database, (error, log) => {
      if (!error) return res.json(log);
    });
  });    
});

app.use(express.static('log'));

app.listen(8080);