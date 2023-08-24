const logger = require('../utils/logger');

const knex = require('knex')(require('../knexfile'));



const findRange = (req, res) => {
    logger.info(req.params);
    logger.info(`Getting data for stock symbol : ${req.params.symb}`);
    console.log(`${req.query.from}`);
    return res.send("test").status(200);
    /*
    knex(req.params.symb)
        .select(["Date", "Open", "High", "Low", "Close"])
        .then((resp) => {
            // logger.info(resp);
            return res.json(resp).status(200);
        }

        )
    */ 
}

module.exports = {findRange}