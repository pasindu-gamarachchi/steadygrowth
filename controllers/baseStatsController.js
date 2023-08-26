const { log } = require('winston');
const logger = require('../utils/logger');

const knex = require('knex')(require('../knexfile'));
const utils = require('../utils/utils');
const { isValidDateRange } = utils;


const calcAllBase = (req, res) =>{

    logger.info(`Getting base stats for stock symbol : ${req.params.symb} for range : ${req.query.from} -> ${req.query.to}`);
    const valDateRange  = isValidDateRange(req);

    if (valDateRange){
        return res.status(valDateRange.statusCode).json(valDateRange.errJson);

    }
    /*
    knex.raw(
        'SELECT STDDEV(close), MIN(close), MAX(close), AVG(close) FROM ?? WHERE date > 2020-01-01 and date <= 2020-12-31',
        [req.params.symb]
    ).then((resp) => {
        logger.info(resp);
        return res.status(200).json(resp)
    }

    )*/
    const knex_raw_base = `SELECT STDDEV(close), MIN(close), MAX(close), AVG(close) FROM ?? WHERE date > "${req.query.from}" and date <= "${req.query.to}"`
    const knex_raw_base_perc = `SELECT close, PERCENT_RANK() OVER(ORDER BY close) AS perc_rank FROM ?? WHERE date> "${req.query.from}" and date <= "${req.query.to}"`

    // TODO : use bindings
    knex.raw(
        knex_raw_base,
        [req.params.symb]
    ).then((resp) => {
        logger.info(resp[0]);
        // return res.status(200).json(resp[0])
        return resp[0];
    }
    ).then((topResp)=>{
        
        knex.raw(
            knex_raw_base_perc,
            [req.params.symb]
        ).then((resp) => {
            // logger.info(resp);
            logger.info(`Resp in final then --> ${topResp[0]['STDDEV(close)']}`);

            const finalRes = {...topResp[0], ...resp[0]}
            return res.status(200).json(finalRes)
        }
        )
    }
    )

    

}

module.exports = {calcAllBase};