const express = require("express")
let bodyParser = require("body-parser")
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
let routes = require("./routes/route.js")
const app = {}
app["server"] = express()
app.server.use(bodyParser.json())
app.server.use(bodyParser.urlencoded({extended:true}))
//////////////////////////////////////////
try {
    let mongoDbConnectionUrl = "mongodb://"+process.env.DBServer+":"+process.env.DBPort+"/"+process.env.schema;
    app['db'] = mongoose.connect(mongoDbConnectionUrl,{useNewUrlParser: true,useUnifiedTopology: true});
}
catch (err){
   console.log("Error in db connection",err)
}
////////////////////////////////////////////
let routeObj = new routes(app)
routeObj.init()
app.server.listen(process.env.port,()=>{
    console.log(`server started at ${process.env.port}`)
})
module.exports = app.server