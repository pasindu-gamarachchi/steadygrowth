const logger = require('../utils/logger');

const evaluatePortfolio =(portfRes) =>{

    let dateArr = getOldestDate(portfRes);
    // logger.info(dateArr);
    let portfolioHist = []
    /*
    for (let i=0; i < dateArr.length; i++){
        let histObj = {"stock_id": }

    }*/
    let portSumm = [];


    portfRes.forEach((elem)=>{
        let purchHistObj = {port_id: elem.port_id, stockSumm: []}
        elem.data.forEach((innerElem) =>{
            let summObj = {
                date: innerElem.Date, 
                stockValue: Math.round(innerElem.Close*elem.purchase_shares, 2), 
                closingPrice: innerElem.Close,
                sharesPurched: elem.purchase_shares
            };
            purchHistObj.stockSumm.push(summObj);
        }
        )
        portSumm.push(purchHistObj);
    }

    )
    
    let sumArr = [];
    let startingDates = portSumm.map((elem)=>{
        return elem.stockSumm[0].date
    }
    );
    //logger.info(startingDates);
    let sums = portSumm.map((elem)=>{
        return elem.stockSumm;
    })
    //console.log(sums);
    for (let i=0; i < dateArr.length; i++){
        let sumObj = {date: dateArr[i], portSum: 0}
        for (j=0; j<sums.length; j++){
            for (k=0; k<sums[j].length; k++){
                if (sums[j][k].date ===dateArr[i]){
                   sumObj.portSum += sums[j][k].stockValue;
                }}
            }
        sumArr.push(sumObj);

    }
        //)
    let allSum = {allSum: "allSumm", vals: []};
    allSum.vals = sumArr;
    portSumm.push(allSum);
    

    return portSumm;


}

const getOldestDate = (dataArr) => {
    dataArr.sort((a,b) =>{
        return new Date(a.purchase_date) - new Date(b.purchase_date);
    }
    )
    dataArr.forEach(element => {
        logger.info(element.purchase_date);
    });
    logger.info(`Oldest Date : ${dataArr[0].purchase_date}`);
    let dates = dataArr[0].data.map((elem) =>{
        return elem.Date;
    })
    return dates;

}

module.exports = {evaluatePortfolio};