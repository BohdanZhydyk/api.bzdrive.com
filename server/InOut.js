const { chkToken } = require('./functions/chkToken')
const { putStatistic } = require('./functions/putStatistic')

const { getState } = require('./routes/getState')
const { news }	= require('./routes/news')
const { auth }	= require('./routes/auth/auth')

const { driveState } = require('./db/driveState.json')


exports.InOut = async (path, req, res)=>{

  // req.headers.cookie
  // req.route.path
  // req.query
  // req.method

  // let InData

  if(req.method){

    if(req.method === "GET"){

      let query = req.query

      switch(path){
        case "/":
          res.send( `error! { msg: no file index.html, query: ${ JSON.stringify(query) } }` )
          break
        default: break
    
      }

    }

    if(req.method === "POST"){

      let InData = {
        err: [],
        link: req.body.link,
        bzToken: req.body.bzToken,
        user: req.body.user,
        IP: req.body.IP,
        object: req.body.object
      }

      chkToken(InData, (data)=>{
        
        InData = {
          err: data.err,
          link: data.link,
          bzToken: data.bzToken,
          user: data.user,
          IP: data.IP,
          object: data.object
        }

        function send(serverData){

          if(serverData.err){ InData.err.push( serverData.err ) }

          res.send({
            err:InData.err,
            link: InData.link,
            bzToken: InData.bzToken,
            user: InData.user,
            IP: InData.IP,
            serverData:serverData.result
          })

          putStatistic({
            link: InData.link,
            bzToken: InData.bzToken,
            user: InData.user,
            IP: InData.IP
          })

        }
        
        switch(InData.link){

          case "/drive":
            getState('/drive', req, res, (data)=> send(data) )
            break

          case "/cv":
            getState('/cv', req, res, (data)=> send(data) )
            break

          case "/news":
            news(req, res, (data)=> send(data) )
            break

          case "/auth":
            auth(req, res, (data)=> send(data) )
            break
          
          default: break
      
        }
        
      })

    }

  }

}