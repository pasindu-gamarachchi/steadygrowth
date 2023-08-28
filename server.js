const winston = require('winston');
const expressWinston = require('express-winston');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');

const chartDataRouter = require('./routes/chartData');
const baseStatsRouter = require('./routes/baseStats');
const userRouter = require('./routes/users');
const prefRouter = require('./routes/preferences');

app.use(express.json());


app.use('/api/chartdata', chartDataRouter);
app.use('/api/baseStats', baseStatsRouter);
app.use('/api/users', userRouter);
app.use('/api/preferences', prefRouter);

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