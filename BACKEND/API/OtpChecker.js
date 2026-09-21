const exp=require("express");
const expressAsyncHandler=require('express-async-handler')
const memberapi=exp.Router();
const nodemailer = require("nodemailer");

memberapi.use(exp.json());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

memberapi.post("/send-otp",expressAsyncHandler(async (req,res) =>{
    let memberscollection=req.app.get("memberscollection");
    let data=req.body;
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    let result=await memberscollection.insertOne({
        email:data.email,
        otp:otp
    });
    // Send OTP email HERE
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: data.email,
        subject: "this OTP is sent by pranay hacker",
        text: `Your OTP is share this with the person who calls you ${otp}`
    });
    if(result){
        res.send({
            success:true,
            message:"OTP is generated successfully"
        })
    }
    else{
        res.send({
            success:false,
            message:"OTP is not generated"
        })
    }
}))

memberapi.post("/verify-otp",expressAsyncHandler(async (req,res) =>{
    let memberscollection=req.app.get("memberscollection");
    let data=req.body;
    let email=data.email;
    let otp=data.otp;
    let result=await memberscollection.findOne({
        email:email,
        otp:otp
    });
    if (result) {
        res.send({
            success: true,
            message: "OTP is correct"
        });
    } 
    else {
        res.send({
            success: false,
            message: "Invalid OTP"
        });
    }
}))

module.exports=memberapi;