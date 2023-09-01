const logger = require('../utils/logger');
const knex = require('knex')(require('../knexfile'));
const utils = require('../utils/utils');
const { isValidReqBody, isValidDateFormat, isInt, isPrice} = utils;


const validatePostBody =(reqbody)=>{
    logger.info("Add to ind portfolio called.")
    if (!isValidReqBody(reqbody, ["user_id", "stock_id", "purchase_date", "purchase_price", "purchase_shares"])) {
        logger.info(`Invalid request body`);
        return {
            "isError": true,
            "errMsg": "Missing required attributes.",
            "statusCode": 400
        }
    }

    if (!isValidDateFormat(reqbody.purchase_date)){
        
        return {
            "isError": true,
            "errMsg": "Invalid Date format for purchase date.",
            "statusCode": 400

        }
    }

    if (!isInt(reqbody.purchase_shares)){
        return {
            "isError": true,
            "errMsg": "Invalid purchase share quantity.",
            "statusCode": 400
        }

    }

    if (!isPrice(reqbody.purchase_price)){
        return {
            "isError": true,
            "errMsg": "Invalid purchase price.",
            "statusCode": 400
        }

    }

    return {"isError":false}

}


const findIndPortfolio = (req, res) => {

    if (!req.query.user_id){
        return res.status(400).json({"isError": true, "errMsg": "Missing user_id"});
    }


    knex('portfolio')
        .select(['port_id', 'user_id','stock_id', 'purchase_date', 'purchase_price', 'purchase_shares'])
        .where(
            {user_id: req.query.user_id}
        ).then((portf) => {
            logger.info(`User prefs -> ${portf}`);
            return res.status(200).json(portf)
        }
        ).catch((err)=>{
            logger.error(err);
        }
        )
}

const addIndPortfolio = (req, res) =>{
    logger.info("Add to ind portfolio called.")
    logger.info(`Valiadting req body : ${!isValidReqBody(req.body, ["user_id", "stock_id", "purchase_date", "purchase_price", "purchase_shares"])}`);
    if (!isValidReqBody(req.body, ["user_id", "stock_id", "purchase_date", "purchase_price", "purchase_shares"])) {
        logger.info(`Invalid request body`);
        return res.status(400).json({
            "isError": true,
            "errMsg": "Missing required attributes."
        })
    }

    if (!isValidDateFormat(req.body.purchase_date)){
        
        return res.status(400).json({
            "isError": true,
            "errMsg": "Invalid Date format for purchase date."
        })
    }

    if (!isInt(req.body.purchase_shares)){
        return res.status(400).json({
            "isError": true,
            "errMsg": "Invalid purchase share quantity."
        })

    }

    if (!isPrice(req.body.purchase_price)){
        return res.status(400).json({
            "isError": true,
            "errMsg": "Invalid purchase price."
        })

    }

    knex("portfolio")
        .insert(
            {
                user_id: req.body.user_id,
                stock_id: req.body.stock_id,
                purchase_date: req.body.purchase_date,
                purchase_price: req.body.purchase_price,
                purchase_shares: req.body.purchase_shares,

            
            }
        ).then( (insertRes) =>{
            logger.info(insertRes);
            return res.status(200).json(insertRes);
        }

        ).catch((err)=>{
            logger.error(`${err.sqlMessage}`);
            if (err.sqlMessage.toLowerCase().includes('a foreign key constraint fails')){
                return res.status(404).json(
                    {
                        "isError": true,
                        "errMsg": "The stock_id or user_id does not exist in the respective tables."
                    }
                )
            }
        }

        )


}

const updateIndPortfolio = (req, res) =>{

    const validReqBody = validatePostBody(req.body);
    if (validReqBody.isError){
        res.status(validReqBody.statusCode).json(
            {
                "isError": validReqBody.isError,
                "errMsg": validReqBody.errMsg
            }
        )
    }
    
    
    knex("portfolio")
    .where({ port_id: req.body.port_id })
    .update({
        "purchase_date": req.body.purchase_date,
        "purchase_price": req.body.purchase_price,
        "purchase_shares": req.body.purchase_shares
    })
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json(`Warehouse with ID: ${req.params.warehouseId} not found`);
      }
      //console.log(res);
      res.status(200).json(
        {"isError": false}
      )
    })
    .catch(() => {
      res
        .status(500)
        .send(`Unable to update warehouse with ID: ${req.params.warehouseId} `);
    });

}

module.exports = {findIndPortfolio, addIndPortfolio, updateIndPortfolio};