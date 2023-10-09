const logger = require('../utils/logger');
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) =>{

    const { first_name, last_name, phone, address, email, password } = req.body;
  
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send("Please enter the required fields.");
    }
  
    const hashedPassword = bcrypt.hashSync(password);
  
    const newUser = {
      first_name,
      last_name,
      phone,
      address,
      email,
      password: hashedPassword
    }
  
    knex('user')
      .insert(newUser)
      .then(() => {
        res.status(200).send("Registered successfully");
      })
      .catch(err => {
        logger.error(err);
        if (err.sqlMessage.toLowerCase().includes(`duplicate entry`)){
            logger.error('Duplicate email');
            return res.status(400).json({"isError": true, "errMsg": "Duplicate e-mail" });


        }
        res.status(400).send("Failed registration");
      });
}

const loginUser = (req, res) =>{
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({"isError": true, 
        "errMsg" :"Please enter the required fields"});
    }
  
    knex('user')
      .where({ email: email })
      .first()
      .then((user) => {
        if (!user) {
          return res.status(400).send("Invalid email");
        }
  
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  
        if (!isPasswordCorrect) {
          return res.status(400).send("Invalid password");
        }
        logger.info("Password valid")
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
  
        res.status(200).json({ token: token });
      })
      .catch(err => {
        logger.error(`Error --> ${err}`);
        res.status(400).send("Couldn't log you in");
      });
}


const findUser = (req, res) =>{
    if (!req.headers.authorization) {
        return res.status(401).send("Please include your JWT");
      }
    
      const authHeader = req.headers.authorization;
      const authToken = authHeader.split(' ')[1];
    
    
      jwt.verify(authToken, process.env.SECRET, (err, decoded) => {
    
        if (err) {
          return res.status(401).send("Invalid auth token");
        }
    
        knex('user')
          .where({ id: decoded.id })
          .first()
          .then(user => {
            delete user.password;
            return res.status(200).json(user);
          })
          .catch(err => {
            res.send(500).send('Cant fetch user info');
          })
      });

}



const findUserPrefs = (req, res) =>{
  if (!req.headers.authorization) {
      return res.status(401).send("Please include your JWT");
    }
  
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(' ')[1];
  
  
    jwt.verify(authToken, process.env.SECRET, (err, decoded) => {
  
      if (err) {
        return res.status(401).send("Invalid auth token");
      }
      logger.info('Validating token');
      knex('user')
        .select(['stock_symbol'])
        .join('user_preferences', 'user_preferences.user_id', 'user.id')
        .where({ id: decoded.id })
        .then(user => {
          return res.status(200).json(user);
        })
        .catch(err => {
          logger.error(`Err : ${err}`);
          return res.send(500).send('Cant fetch user info');
        })
    });

}


module.exports = {registerUser, loginUser, findUser, findUserPrefs};