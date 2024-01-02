const Admin=require('../../models/adminModel');
const admintoken=require('../../models/admintoken');
const bcrypt=require('bcryptjs');
const express=require('express');
const jwt=require('jsonwebtoken');

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



//http://localhost:5000/admin-Login-api/login
router.post('/login',async(req,res)=>{
          
    const admin_email=req.body.admin_email;
    const admin_pass=req.body.admin_pass;
    try {
  
        const AdminFound=await Admin.findOne({admin_email});

        if(!AdminFound){
             res.json({
                'sts':1,
                "msg":"Email id is not found"
             })
        }
        else{
            //cheking whete the input pass and database saved pass matches or not
            const match=await(bcrypt.compare(admin_pass,AdminFound.admin_pass));

            if(match){
                //generate the token
                const token=jwt.sign({adminId:AdminFound._id},process.env.JWT_SECRET,{expiresIn:'36hr'});
                const expiresAt=new Date(Date.now()+(5*60*60*1000))

                const adminTokenSave=new admintoken({
                    adminId:AdminFound._id,
                    token,//we not writing kt value pair becoz both names are same like  token:token 
                    expiresAt,
                })

               await adminTokenSave.save();

              //storing required files pnly to send back to the frontend in response
               const aid=AdminFound._id;
               const aname=AdminFound.admin_name;
               const aemail=AdminFound.admin_email;

               return res.json({
                'sts':0,
                aid,
                aname,
                aemail,
                token
               })

            }
            else{
                //admin doesnt found
                return res.json({
                    'sts':2,
                    'msg':"Password is wrong"
                   })
            }
        }

       
        
    } catch (error) {
        res.status(500).json({
            'error':error
        })
    }
})

module.exports=router;