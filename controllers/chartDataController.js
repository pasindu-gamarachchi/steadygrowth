const { log } = require('winston');
const logger = require('../utils/logger');

const knex = require('knex')(require('../knexfile'));
const utils = require('../utils/utils');
const { isValidDateFormat } = utils;


const findRange = (req, res) => {


    logger.info(`Getting data for stock symbol : ${req.params.symb} for range : ${req.query.from} -> ${req.query.to}`);

    if (!req.params.symb){
        logger.error(`Missing stock symbol`);
        return res.status(400).json({"isError": true, "errMsg": "Missing stock symbol" });
    }

    if (!req.query.from){
        logger.error(`Missing from date`);
        return res.status(400).json({"isError": true, "errMsg": "Missing from date" });
    }
    else if (!req.query.to){
        logger.error(`Missing to date`);
        return res.status(400).json({"isError": true, "errMsg": "Missing to date" });
    }


    if (!isValidDateFormat(req.query.from)){
        logger.error(`Invalid  from date ${req.query.from}`);
        return res.status(400).json({"isError": true, "errMsg": "Invalid from date" });
    }

    if (!isValidDateFormat(req.query.to)){
        logger.error(`Invalid  to date`);
        return res.status(400).json({"isError": true, "errMsg": "Invalid to date" });
    }
    


    knex(req.params.symb)
        .select(["Date", "Open", "High", "Low", "Close"])
        .where('Date', '<',  req.query.to)
        .andWhere('Date', '>=',  req.query.from)
        .then((resp) => {
            return res.json(resp).status(200);
        }
        ).catch((err)=> {
            logger.error(err.sqlMessage.toLowerCase())
            if (err.sqlMessage.toLowerCase().includes(`table 'stock_data.${req.params.symb}' doesn't exist`)){
                logger.error('Missing table');
                return res.status(404).json({"isError": true, "errMsg": "Missing table" });


            }

        })
    
}


const onDate = (req, res) => {
    logger.info(`Getting data for stock symbol : ${req.params.symb} on date : ${req.query.ondate}`);

    if (!isValidDateFormat(req.query.ondate)){
        logger.error(`Invalid  on date`);
        return res.status(400).json({"isError": true, "errMsg": "Invalid on date" });
    }

    knex(req.params.symb)
        .select(["Date", "Open", "High", "Low", "Close"])
        .where('Date', '=',  req.query.ondate)
        .then((resp) => {
            return res.json(resp).status(200);
        }
        ).catch((err)=> {

            logger.error(err.sqlMessage.toLowerCase())
            if (err.sqlMessage.toLowerCase().includes(`table 'stock_data.${req.params.symb}' doesn't exist`)){
                logger.error('Missing table');
                return res.status(404).json({"isError": true, "errMsg": "Missing table" });


            }


        })


}

module.exports = {findRange, onDate}