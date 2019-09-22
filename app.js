//CONNECTION TO OUR DATABASE
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'MAGAZINE';

//Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true });

//Use connect method to connect to the Server
client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    // insertDocuments(db, function(){
    //     client.close();
    // })
    findDocuments(db, function(){
        client.close();
    })
})

//IT WILL CREATE NEW COLLECTION
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('products');
    // Insert some documents
    collection.insertMany([
      {id:1, name : "iPhone", score:2}, {id:2, name : "Tablet", score:5}, {id:3, name: "Note", score:4}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 fruits into the fruitsDB");
      callback(result);
    });
}
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('products');
    // Find some documents
    collection.find({}).toArray(function(err, products) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(products)
      callback(products);
    });
}