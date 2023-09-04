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
                stockValue: innerElem.Close*elem.purchase_shares, 
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

const getSortedPortf = (dataArr) =>{
    dataArr.sort((a,b) =>{
        return new Date(a.purchase_date) - new Date(b.purchase_date);
    }
    )
    return dataArr;

}

const generateDateArray= (startDateStr, endDateStr) =>{
    /*REDUNDANT*/
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dateArray = [];
    logger.info(startDate);
    if (startDate > endDate) {
      return dateArray;
    }
  
    let currentDate = startDate;
    let ind = 0;
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      logger.info(dateString);
      const spendObj = {date: dateString, spend: ""}
      if (ind>0){
        dateArray.push(spendObj);
      }
      ind ++;
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateArray;
  }


const evaluateSpendHistory= (portHistObj, spendArr) =>{
    //const oldestDate = getOldestDate(portHistObj);
    const sortedPortHist = getSortedPortf(portHistObj)
    //logger.info(`Oldest date : ${sortedPortHist}`);
    //logger.info(`Oldest date : ${sortedPortHist[0].purchase_date}`);

    const spendHistArr = [];
    let sum = 0;
    portHistObj.forEach((portElem)=>{
        sum += portElem.purchase_shares * portElem.purchase_price;
        spendHistObj = {
            date : portElem.purchase_date, 
            spend: sum
        }
        spendHistArr.push(spendHistObj);
    });
    //const spendArr = generateDateArray(sortedPortHist[0].purchase_date, "2020-04-01");
    // const spendArr = generateDateArray("2020-03-25", "2020-04-01");
    let currSum = 0

    spendArr.forEach((spendElem)=>{
        let spendOnDate = false;
        for (let i=0; i< spendHistArr.length; i++){
            if (spendElem.date === spendHistArr[i].date){
                spendElem.spend = spendHistArr[i].spend;
                currSum = spendHistArr[i].spend;
                spendOnDate = true;
                
            }
            
        }
        if (!spendOnDate){
            spendElem.spend = currSum;
        }
    })

    return spendArr;

}

module.exports = {evaluatePortfolio, evaluateSpendHistory, getSortedPortf};