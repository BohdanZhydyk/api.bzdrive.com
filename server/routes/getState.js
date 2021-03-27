const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')


exports.getState = (link, req, res, callback)=>{

  let id

  switch(link){
    // case "/drive":  id = '602a8a11ec2924a62f00834d'; break;
    case "/drive":  id = '605918e6ec292437d800834d'; break;
    case "/cv":     id = '602a8ad3ec29245f3000834d'; break;
    default: break;
  }

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    if (error){ callback({ err:error, result:false }) }
    else{
      client.db(dbName).collection('state').findOne( { _id: new ObjectID(id)}, (error, result)=>{

        if(error){ callback({ err:error, result:false }) }
        else{
          if(result === null){ callback({ err:"getState: result === null", result:false }) }
          else{ callback({ err:false, result:result }) }
        }

      })
    }

  })
  
}