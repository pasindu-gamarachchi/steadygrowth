const { log } = require('winston');
const logger = require('../utils/logger');

const knex = require('knex')(require('../knexfile'));
const utils = require('../utils/utils');
const summCalcs = require('../utils/summaryCalculations');
const { isValidDateRange } = utils;
const { generateSummary} = summCalcs;

const calcAllBase = (req, res) =>{

    logger.info(`Getting base stats for stock symbol : ${req.params.symb} for range : ${req.query.from} -> ${req.query.to}`);
    const valDateRange  = isValidDateRange(req);

    if (valDateRange){
        return res.status(valDateRange.statusCode).json(valDateRange.errJson);

    }

    const knex_raw_base = `SELECT STDDEV(close), MIN(close), MAX(close), AVG(close) FROM ?? WHERE date > "${req.query.from}" and date <= "${req.query.to}"`
    const knex_raw_base_perc = `SELECT close, PERCENT_RANK() OVER(ORDER BY close) AS perc_rank FROM ?? WHERE date> "${req.query.from}" and date <= "${req.query.to}"`

    // TODO : use bindings, clean up chain
    knex.raw(
        knex_raw_base,
        [req.params.symb]
    ).catch((err)=> {
        logger.error(`${err}`);
        if (err.sqlMessage.toLowerCase().includes(`table 'stock_data.${req.params.symb}' doesn't exist`)){
            logger.error('Missing table');
            throw new Error('Table not found');

        }
        return {isError:true};

    }
    )
    .then((resp) => {
        logger.info(`Attempting to get the first element from results.`);
        return resp[0];
    }
    ).catch((err)=> {
        logger.error(`${err}`);
        throw new Error(err.Error);
    }
    ).
    then((topResp)=>{
        logger.info(`Attempting to generate perc rank, topResp -> ${topResp.isError}`);
        if (!topResp.isError){
            knex.raw(
                knex_raw_base_perc,
                [req.params.symb]
            )
            .catch((err)=> {
                logger.error(`${err}`);
        
            }
            )
            .then((resp) => {
                if (resp){
                const finalRes = {...topResp[0], percentiles :resp[0]};
                return res.status(200).json(generateSummary(finalRes));
                }
            }
            )
        }else{
            return res.status(400).json({"isError": true});
        }
    }
    ).catch((err)=> {
        logger.error(`line-71: Error --- > ${err}`);
        return res.status(400).json({"isError": true});

    }
    )

    

}

module.exports = {calcAllBase};