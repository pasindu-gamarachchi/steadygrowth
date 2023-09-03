const logger = require('../utils/logger');
const knex = require('knex')(require('../knexfile'));


const findAll = (req, res) => {

    if (!req.query.user_id){
        return res.status(400).json({"isError": true, "errMsg": "Missing user_id"});
    }


    knex('user_preferences')
        .select(['stock_symbol'])
        .where(
            {user_id: req.query.user_id}
        ).then((prefs) => {
            logger.info(`User prefs -> ${prefs}`);
            return res.status(200).json(prefs)
        }
        ).catch((err)=>{
            logger.error(err);
        }
        )
}

const addPreference = (req, res) => {

    const requiredCols = ['user_id', 'stock_symbol', 'preference_description'];
    let isValidBody = true
    requiredCols.forEach( (el) =>{
        if (!el in req.body){
            isValidBody = false;
        }
    }
    );
    
    if (!isValidBody){
        return res.status(400).json({
            "isError": true,
            "errMsg": "Missing required attributes."
        })
    }
    
    knex("user_preferences")
        .insert(
            {
                user_id: req.body.user_id,
                stock_symbol: req.body.stock_id,
                preference_description: req.body.preference_description
            
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

const removePreference = (req, res) => {

    if (!req.query.user_id){
        return res.status(400).json({"isError": true, "errMsg": "Missing user_id"});
    }

    if (!req.query.stock_symbol){
        return res.status(400).json({"isError": true, "errMsg": "Missing stock_id"});
    }
    knex("user_preferences")
        .where(
            {
                user_id: req.query.user_id,
                stock_symbol: req.query.stock_symbol
            }
        )
        .del()
        .then((delResp) =>{
            logger.info(delResp)
            return res.status(200).json(delResp);
        }

        )
        .catch((err)=>{
            logger.error(`${err.sqlMessage}`);
            if (err.sqlMessage.toLowerCase().includes('a foreign key constraint fails')){
                return res.status(404).json(
                    {
                        "isError": true,
                        "errMsg": "The stock_id or user_id does not exist in the respective tables."
                    }
                )
            }
        })
}

module.exports = {findAll, addPreference, removePreference};