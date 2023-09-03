const { log } = require('winston');
const logger = require('../utils/logger');
const knex = require('knex')(require('../knexfile'));
const utils = require('../utils/utils');
const { evaluatePortfolio } = require('../utils/portfolioCalculations');


const findIndPortfolio = (user_id) => {

    if (!user_id){
        return {"isError": true, "errMsg": "Missing user_id"};
    }

    return knex('portfolio')
        .select(['port_id', 'user_id','stock_symbol', 'purchase_date', 'purchase_price', 'purchase_shares'])
        .where(
            {user_id: user_id}
        ).andWhere('purchase_shares', '>',  0)

        then((portf) => {
            return portf
        }
        ).catch((err)=>{
            logger.error(err);
        }
        )
}

const getDataRange = (symb, from, to)=>{
    return knex(symb)
    .select(["Date", "Open", "High", "Low", "Close"])
    .where('Date', '<',  to)
    .andWhere('Date', '>=',  from)
    .then((resp) => {
        // console.log(resp);
        // let combRes = {symb: symb, from:from, to:to, data:resp}
        return resp;
    }
    ).catch((err)=> {
        logger.error(err.sqlMessage.toLowerCase())
        if (err.sqlMessage.toLowerCase().includes(`table 'stock_data.${req.params.symb}' doesn't exist`)){
            logger.error('Missing table');
            return {"isError": true, "errMsg": "Missing table" }


        }

    })
}

const summary = (req, res)=>{
    let port = findIndPortfolio(req.query.user_id);
    
    port.then((portfRes)=>{
        const proms = []
        portfRes.forEach(element => {
            let p = new Promise((resolve, reject)=>{
                resolve(getDataRange(element.stock_symbol, element.purchase_date ,  '2020-04-01')) // TODO UPDATE THIS
            })
            proms.push(p);

        });
        Promise.all(proms).then((vals) =>{

            portfRes.forEach((elem, ind) =>{
                elem.data = vals[ind];
            }

            )
            let evaledPort = evaluatePortfolio(portfRes);
            res.status(200).json(evaledPort);
            
        }

        )

    })
    

    
    
}


module.exports = {summary};