const jwt = require("jsonwebtoken");
User = require("../models/User");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET || "myapisecret", async function (err, decode) {
      if (err) req.user = undefined;

      try {
          const user = await User.findOne({
            _id: decode.id
          })
  
          try {
              
              req.user = user;
              next();
          } catch (error) {
              res.status(500).send({message: error});
        }
      } catch(error) {
        
        console.log(error)
        req.user = undefined;
        next();
      }

    });
  } else {
    
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;