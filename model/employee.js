const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
   empID: { type: Number, required: true, unique: true },
   empName: { type: String, required: true },
   empMail: {type:String, required:true, unique:true},
   empMobile: {type:Number, required:true, unique:true},
   empJoinDate:{type:String, required:true},
   empDOB:{type:String, required:true},
   empDepartment:{type:String, required:true},
   empDesignation:{type:String, required:true},
})

module.exports  = mongoose.model('Employee', EmployeeSchema)