const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_HOSTNAME;
// Database Name
const dbName = 'gotenacious';
app.use(express.json());
app.get('/', (req, res) => { 
  // Get all messages
  MongoClient.connect(url, function(err, client) {
    // assert.equal(null, err);
    if (err) {
      console.error('An error occurred connecting to MongoDB: ', err);
    } else {
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      
      getMessages(db, (messages) => {
        client.close();
        res.send(messages)
      })
    }
    
  });
  // res.sendFile(__dirname + '/templates/dashboard.html')
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
  // console.log(rb)
  const collection = db.collection('messages')
  collection.insertOne(message)
  callback();
}

const getMessages = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('messages');
  // Find some documents
  collection.find({}).toArray(function(err, messages) {
    console.log("Found the following messages");
    console.log(messages)
    callback(messages);
  });
}