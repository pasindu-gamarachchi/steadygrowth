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

const isValidReqBody = (reqBody, requiredProps) =>{
    let isValidBody = true;
    requiredProps.forEach( (el) =>{
        logger.info(`Validating req col : ${el}, ${el in reqBody}`);
        if (!(el in reqBody)){
            isValidBody = false;
        }
    }
    );
    return isValidBody;
}

const isInt = (num) => {
    if ((String(num).trim()[0] === "+") || (String(num).trim()[0] === "-")) {
      return false;
    }
    return (typeof (num) === 'number' || typeof (num) === "string" && num.trim() !== '') && !isNaN(num);
  }

const isPrice = (num) =>{
    let regex  = /^\d+(?:\.\d{0,2})$/;
    if (regex.test(num)){
        return true;
    }
    return false;
}


module.exports = {
    isValidDateFormat,
    isValidDateRange,
    isValidReqBody,
    isInt,
    isPrice
}