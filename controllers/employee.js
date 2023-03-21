const Employee = require('../models/employee')

const createEmployee = async (req,res)=>{
    try {
    const employee = await Employee.create(req.body)
    res.status(201).json({employee});
        
    } catch (error) {
    res.status(500).json({msg:error})
    }
}


const getEmployee = async (req,res)=>{
    try {
        const {id:empID} = req.params;
        const employee = await  Employee.findOne({_id:empID})
        if(!employee){
            return res.status(404).json({msg:`No employee with id : ${empID}`})
        }
        res.status(200).json({employee})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteEmployee = async (req,res)=>{
    try {
        const {id:empID} = req.params;
        const employee = await Employee.findOneAndDelete({_id:empID});
        if(!employee){
            return res.status(404).json({employee:null, status:'Success'})
        }
        res.status(200).json({employee})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


const updateEmployee = async (req,res)=>{
    try {   
    const{id:empID} = req.params;
    const employee = await Employee.findOneAndUpdate({_id:empID}, req.body,{new:true,runValidators:true})
    if(!employee){
        return res.status(404).json({employee:null, status:'Success'})
    }
    res.status(200).json({employee})
} catch (error) {
    res.status(500).json({msg:error})
}
}

module.exports = {getEmployee,createEmployee,updateEmployee,deleteEmployee}