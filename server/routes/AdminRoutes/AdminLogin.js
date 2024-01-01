const Admin=require('../../models/adminModel');
const bcrypt=require('bcryptjs');
const express=require('express');

const router=express.Router();

//http://localhost:5000/admin-Login-api/createadmin
router.post('/createAdmin',async(req,res)=>{
    try {
        // const hashedpass=await()
        // const response=req.body;
        // console.log(response);
        const newAdmin=new Admin({
            //this 1st aadmin_name is the name presern in schema and the 2nd admin_name is the name present in mpostman sending data 
            admin_name:req.body.admin_name,
            admin_email:req.body.admin_email,
            admin_pass:await bcrypt.hash(req.body.admin_pass,12)
        })
       
        const saveAdmin=await newAdmin.save();
        // console.log(saveAdmin);
        res.status(200).json(saveAdmin);
        
    } catch (error) {
        res.status(500).json({
            'error':error
        })
    }
})

module.exports=router;