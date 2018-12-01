const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_HOSTNAME; // Connection URL
const baseUrl = process.env.BASE_URL; // Connection URL
const dbName = 'gotenacious'; // Database Name

app.use(express.json());
app.set('view engine', 'pug')

app.get('/', (req, res) => { 

  let filter = req.query.type ? { type: req.query.type } : {}
  // Get all messages
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('An error occurred connecting to MongoDB: ', err);
    } else {
      console.log("Connected successfully to server");
      const db = client.db(dbName);

      getMessages(db, filter, (messages) => {
        client.close()

        res.render('dashboard', { baseUrl: baseUrl, title: 'GoTenatious Mesh Dashboard', messages: messages })
      })
    }
  });
})

app.post('/message', (req, res) => { 
  // console.log(req.body)
  message = req.body
  MongoClient.connect(url, function(err, client) {
    // assert.equal(null, err);
    if (err) {
      console.error('An error occurred connecting to MongoDB: ', err);
    } else {
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      
      insertMessage(db, message, () => {
        client.close();
        res.send('message added to db')
      })
    }
    
  });
})

app.listen(port, () => console.log(`Dashboard listening on port ${port}!`))

const insertMessage = function(db, message, callback) {
  const collection = db.collection('messages')
  collection.insertOne(message)
  callback();
}

const getMessages = function(db, filter, callback) {
  // Get the documents collection
  const collection = db.collection('messages');
  collection.find(filter).toArray(function(err, messages) {
    callback(messages);
  });
}