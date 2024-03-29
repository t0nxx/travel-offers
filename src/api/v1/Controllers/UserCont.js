const mongoose = require('mongoose');
const {User}= require('../models/user');
const {validIdObject}=require('../helpers/validateObjectId');
const bcrypt = require('bcryptjs');

/* get all Users handler */ 
const getAllUsers = async (req,res)=>{
    try {
        const result = await User.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one User handler */
const getOneUser = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await User.findById(req.params.id);
      if(!result) throw new Error("no User was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new User */ 

const addUser = async(req,res)=>{
    try {
    const {name , email , password , gender , address , birthday  } = req.body ;
    const user = new User({
        name ,
        email ,
        password,
        gender ,
        address ,
        birthday ,   
    });
    await user.save();
    res.status(200).send("User added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update User */ 
const updateUser = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await User.findById(req.params.id);
        if(!result) throw new Error("no User was found");
        /* check if new pass cause mongoose pre update is fkin sh*t */
        if (updatedData.password) {
            if(updatedData.password.length < 6){
                throw new Error ("password length not less than 6");
            }
           updatedData.password = await bcrypt.hashSync(updatedData.password,10);
        }
        ////////
        await User.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send("User update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await User.findById(req.params.id);
        if(!result) throw new Error("no User was found");
        await User.findByIdAndRemove(req.params.id);
        res.status(200).send("User deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllUsers=getAllUsers;
exports.getOneUser=getOneUser;
exports.addUser=addUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;