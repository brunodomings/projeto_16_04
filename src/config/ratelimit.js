const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10, 
  message: "Muitas requisições, tente novamente depois. Bruno Domingos dos Santos RGM 2417511"
});

module.exports = limiter; 
