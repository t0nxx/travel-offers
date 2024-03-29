const mongoose = require('mongoose');
const {Company}= require('../models/company');
const {User}= require('../models/user');
const {validIdObject} = require('../helpers/validateObjectId');

/* get all Companies handler */ 
const getAllCompanies = async (req,res)=>{
    try {
        const result = await Company.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one Company handler */
const getOneCompany = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Company.findById(req.params.id);
      if(!result) throw new Error("no Company was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new Company */ 

const addCompany = async(req,res)=>{
    try {
    const {name , about ,stores , gallery , socialMedia} = req.body ;
    const company = new Company({
        name ,
        about ,
        stores , 
        gallery , 
        socialMedia
    });
    await company.save();
    res.send("Company added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update Company */ 
const updateCompany = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await Company.findById(req.params.id);
        if(!result) throw new Error("no Company was found");
        await Company.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send("Company update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}
/* delete Company */
const deleteCompany = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await Company.findById(req.params.id);
        if(!result) throw new Error("no Company was found");
        await Company.findByIdAndRemove(req.params.id);
        res.status(200).send("Company deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}
/* add offer to fav */ 
const addCompanyToFav = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Company.findById(req.params.id);
      if(!result) throw new Error("no Company was found");
      const likedComp = {'$push' : {'favoriteCompanies' : req.params.id}};
      const user = await User.findByIdAndUpdate("5c605aae402629201d8504e3",likedComp,{new : true, upsert : true}) ;
      // req.user._id after auth complete
      res.status(200).send('added to favorite'); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}


exports.getAllCompanies=getAllCompanies;
exports.getOneCompany=getOneCompany;
exports.addCompany=addCompany;
exports.updateCompany=updateCompany;
exports.deleteCompany=deleteCompany;
exports.addCompanyToFav=addCompanyToFav;
