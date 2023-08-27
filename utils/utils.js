const { log } = require('winston');
const logger = require('../utils/logger');


const isValidDateFormat = (dateString) => {
    const dataRegEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(dataRegEx);

}

const isValidDateRange = (req)=> {

    if (!req.params.symb){
        logger.error(`Missing stock symbol`);
        return {
            statusCode: 400,
            errJson : {"isError": true, "errMsg": "Missing stock symbol" }
        }
    }

    if (!req.query.from){
        logger.error(`Missing from date`);
        return {
            statusCode: 400,
            errJson : {"isError": true, "errMsg": "Missing from date" }
        }
    }
    else if (!req.query.to){
        logger.error(`Missing to date`);
        return {
            statusCode: 400, 
            errJson: {"isError": true, "errMsg": "Missing to date" }
        }
    }


    if (!isValidDateFormat(req.query.from)){
        logger.error(`Invalid  from date ${req.query.from}`);
        return {
            statusCode: 400,
            errJson: {"isError": true, "errMsg": "Invalid from date" }
        }
    }

    if (!isValidDateFormat(req.query.to)){
        logger.error(`Invalid  to date`);
        return {
            statusCode: 400,
            errJson : {"isError": true, "errMsg": "Invalid to date" }
        }
    }
    return false;
}



module.exports = {
    isValidDateFormat,
    isValidDateRange
}