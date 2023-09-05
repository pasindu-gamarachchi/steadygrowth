const { log } = require('winston');
const logger = require('../utils/logger');


const generateSummary = (calcObj) =>{

    // logger.info(calcObj);
    logger.info('---- Generating summary object ------');
    //logger.info(Object.keys(calcObj));
    //logger.info(calcObj.percentiles.length);
    const percentiles = getPercentiles(calcObj.percentiles);
    //logger.info(`Percentiles : ${percentiles}`);
    const allStats = {
        stdDev: Number(calcObj["STDDEV(close)"].toFixed(2)),
        min: calcObj["MIN(close)"],
        max: calcObj["MAX(close)"],
        //avg: Number(calcObj["AVG(close)"].toFixed(2)), 
        avg: Number(calcObj["AVG(close)"]).toFixed(2), 

        median: percentiles.median, 
        _25perc: percentiles._25th,
        _75perc: percentiles._75th
    }
    return allStats;

}

const getPercentiles = (perc)=> {
    const percResults = {median: null, _25th: null, _75th: null}
    const ind25 = parseInt(perc.length*0.25);
    const ind50 = parseInt(perc.length*0.5);
    const ind75 = parseInt(perc.length*0.75);

    [["median", ind50], ["_25th", ind25], ["_75th", ind75]].forEach((elem) => {
        try{
            percResults[elem[0]] = perc[elem[1]];
        }
        catch{
            logger.warn(`Failed to get : ${elem[0]}`);
        }
    }
    )

    return percResults;


}


module.exports = {generateSummary};