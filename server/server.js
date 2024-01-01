require('dotenv').config();

const express = require('express')
const cors=require('cors');
const bodyParser=require('body-parser');

const db=require('./db')


//ALL routes imports
const adminLogin=require('./routes/AdminRoutes/AdminLogin');



const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',  (req, res)=> {
  res.send('Hello World')
})


//ALL routs
app.use('/admin-login-api',adminLogin);


app.listen(process.env,()=>{
    console.log(`server running on port  ${process.env.PORT}`);
})