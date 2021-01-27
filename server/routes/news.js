const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName } = require('./../safe/safe')


exports.news = (req, res)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{

      client.db(dbName).collection('bz_news').find({}).toArray( (error, result)=>{
        if(error){ console.log(error) }
        else{ res.send( result ) }
      })

    }
  })
  
}