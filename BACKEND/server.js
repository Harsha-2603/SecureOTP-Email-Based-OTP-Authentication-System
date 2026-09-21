const dotenv = require("dotenv");
dotenv.config();


const exp=require("express");
const app=exp();
const mclinet=require("mongodb").MongoClient;
const cors = require("cors");
const db=process.env.DATABASE_CONNECTION_URL;

app.use(cors());
app.use(exp.json());

mclinet.connect(db, { family: 4 })
.then(client =>{
    let dbobj=client.db('OTP_CHECKER');
    let collection=dbobj.collection('Members');
    app.set("memberscollection",collection);
    console.log("the db has been connected successfully");
})
.catch(err => console.log("there is a error",err));

const memberapi=require("./API/OtpChecker");

app.use("/otpchecker",memberapi);

app.use((req,res) =>{ 
    res.send("the path is invalid:")
})

let pnumber=process.env.PORT;

app.listen(pnumber,()=>{
    console.log(`server is live on port:${pnumber}`)
})

