const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const crypto = require('crypto-js');
const path = require('path');
require('dotenv').config();
const UserAuth = async(req,res,next)=>{
    if (!process.env.EnableAuth) return next(); // disable auth in dev
    const token = req.header("Authorization");
    if (!token) {return res.status(403).sendFile(path.join(__dirname , '../../../../403.html'));} 
    else if (token === process.env.MASTER_SECRET){ next();}  /// master key for all
    else try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            if(decode){
                if(decode.useType != 'EmailUser') {
                    req.user = decode ;
                    next() ;
                } else {
                        let {xxx} = decode;
                    if(!xxx) throw new Error ('جلسة منتهية. برجاء اعادة تسجيل الدخول');
                    /// decrypt the pass with random string
                    let temp = crypto.AES.decrypt(xxx.toString(),process.env.CRYPTO_SECRET);
                    xxx = JSON.parse( temp.toString(crypto.enc.Utf8));

                    let splited = xxx.split('$$$');
                    let pass = splited[1];
                    let user = await User.findById(decode._id);
                    if(!user || pass != user.password){
                        throw new Error ('جلسة منتهية. برجاء اعادة تسجيل الدخول');
                    }
                    req.user = decode ;
                    next();
                }
                
            }
            else throw new Error('جلسة منتهية. برجاء اعادة تسجيل الدخول');
            next();
        } catch (error) {
            res.status(400).send({message :'جلسة منتهية. برجاء اعادة تسجيل الدخول'});
        }  
}
exports.UserAuth=UserAuth;