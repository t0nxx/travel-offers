const {Company}= require('../models/company');
const {validIdObject} = require('../helpers/validateObjectId');

/* get all Companies handler */ 
const getAllCompanies = async (req,res)=>{
    try {
        const result = await Company.find({});
        res.status(200).send({message:result});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* get one Company handler */
const getOneCompany = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Company.findById(req.params.id);
      if(!result) throw new Error("no Company was found");
      res.status(200).send({message:result}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* add new Company */ 

const addCompany = async(req,res)=>{
    try {
    const {name , phone} = req.body ;
    const company = new Company({
        name ,
        phone
    });
    await company.save();
    res.send({message:"Company added "});
    } catch (error) {
        res.status(400).send({message:error.message});
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
        res.status(200).send({message:"Company update done"});
    } catch (error) {
        res.status(400).send({message:error.message});
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
        res.status(200).send({message:"Company deleted"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

exports.getAllCompanies=getAllCompanies;
exports.getOneCompany=getOneCompany;
exports.addCompany=addCompany;
exports.updateCompany=updateCompany;
exports.deleteCompany=deleteCompany;