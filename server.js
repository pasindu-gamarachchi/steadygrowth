const winston = require('winston');
const expressWinston = require('express-winston');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');

const chartDataRouter = require('./routes/chartdata');

app.use('/api/chartdata', chartDataRouter);


/*
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
  }));
*/

const PORT = process.env.PORT || 5050;

app.use(express.static('./public'));
const TESTING = process.env.TESTING || false;
const corsObj =  TESTING ?  { }:  { origin: process.env.CLIENT_HOST}

app.use(cors(
    corsObj
))



app.get('/', (req, res) => {

    res.json({"msg": "hello"}).status(200);
}
)

app.listen(PORT, ()=> {

    logger.info(`🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ------------- Server running on ${PORT} ------------ 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`);
})