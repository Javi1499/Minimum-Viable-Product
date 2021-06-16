const bcrypt = require('bcrypt')
const helpers = {};
const jtw = require("jsonwebtoken");

helpers.encryptPassword = async (password)=>{
const salt =  await bcrypt.genSalt(10);
const passwordFinal = await bcrypt.hash(password,salt);
return passwordFinal;
};

helpers.loginPassword = async (password, passwordGuardada)=>{
  try {
      const res = await bcrypt.compare(password, passwordGuardada);       
    return res;
    
  } catch(e) {
      console.log(e);
      
  }


};

helpers.verifyJWT =  (req, res, next) =>{
    const token = req.headers["x-access-token"];
    if(!token){
        res.send("Necesitas token");
    } else{
        jtw.verify(token, "secretJWT",(err, decode)=>{
            if(err){
                res.json({auth:false, mensaje:"Te falta Auntenticvarte"});
            } else {
                req.token = decode.id;
                next();
            }
        })
    }
}
module.exports = helpers;