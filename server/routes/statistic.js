const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName } = require('./../safe/safe')


exports.statistic = (req, res)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log(error) }
    else{

      client.db(dbName).collection('statistic').find({}).sort({_id:-1}).limit(100).toArray( (error, result)=>{
        if(error){ console.log(error) }
        else{ res.send( result ) }
      })

    }
  })
  
}