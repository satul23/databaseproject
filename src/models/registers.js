const mongoose = require("mongoose");
const validator = require("validator");
const EmployeeSchema = new mongoose.Schema ({
    Email : {
         type : String,
         required : true,
         unique : true 
    },
    Password : {
        type : String,
         required : true,
         unique : true 
    },
    Address :  {
        type : String,
        required : true 
   },
   City : {
    type : String,
    required : true 
   },
   State : {
    type : String,
         required : true 
   },
   Zip : {
    type : Number,
    required : true 
   }
   
});

   const Register = new mongoose.model("Register",EmployeeSchema);

   module.exports = Register;