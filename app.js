// $('html').append('<link rel="stylesheet" type="text/css" href="./style.css">');

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const path = require('path');

// const app = express();

const Web3 = require('web3');

const app = express();

const contract = require('truffle-contract');

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://103.67.238.177:6300"));
// console.log(web3);

const TokenArtifact1 = require('./upsteer/build/contracts/finnal.json');
const TokenArtifact2 = require('./upsteer/build/contracts/newdigital.json');

      // const Token1 = contract(TokenArtifact1);
      // const Token2 = contract(TokenArtifact2);
      // // console.log("jhbhjkjkkjkbjbkbkbkbkb",Token1);
       
      // const kar=Token1.setProvider("HTTP://103.67.238.177:6300");
      // Token2.setProvider(new Web3.providers.HttpProvider("HTTP://103.67.238.177:6300"));
      // console.log("kar",kar);
      
      const tokenInstance1 =  "0x4A3471208b6E59576eda408a81270E42A3a7c428"
      const tokenInstance2 =  "0xd4f25DE06605a6B6561Bc43e3D09dECc0701B869"
      // console.log("..........,,,,,,contarct1",tokenInstance1);
      // console.log("..........,,,,,,contarct2",tokenInstance2);
      

      this.contract =  new web3.eth.Contract(TokenArtifact1.abi,tokenInstance1);
      this._contract1 = new web3.eth.Contract(TokenArtifact2.abi,tokenInstance2);
//       console.log("contarct 1",this._contract);
//       console.log("contract 2",this._contract1);

     web3.eth.getAccounts((err, result) => {
        // console.log("accounts",result);
        this.account = result[0];
        console.log(this.account);
     });
//      console.log('Connected on Ganache LocalHost');






app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3005, () => {
  console.log("The server started on port 3001 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log('The mail has beed send 😃 and the id is ${info.messageId}');
    res.send(info);
  });
});

app.get("/studentdata", (req, res) => {
 console.log("Studenttttttt",req.body.studentid1);
// let user1 = req.body;
console.log("methods",tokenInstance1);

 
        this.contract.methods.alls("VB400").call().then(result=>{
         console.log("Data",result);
         res.send(result)
        })
       
        
        // // const value = await contract.value()
        // console.log("get student data",result);
        
        // res.send(result)
        // });
})
// app.post("/sendmailuni", (req, res) => {
//   console.log("request came");
//   let UNI = req.body;
//   sendMail(UNI, info1 => {
//     console.log('The mail has beed send 😃 and the id is ${info.messageId}');
//     res.send(info1);
//   });
// });

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password 
    }
  });

  let mailOptions = {
    from: '"admin"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Application Submitted", // Subject line
  
  html:`<div class="card card_complete_email mt-md-5" style="   width: 65%; height:400px ! important;
  border-radius: 0px;
  margin: auto;">
  <div class="card-header  card_header_email pt-md-4 pb-md-4" style="  text-align: -webkit-center;
  background-color: #512da8;
  color: white;">
      <img src="eemail.png" class="imgi" style="width: 12%;">
      <div class="text-center mt-md-3">Welcome to Digital Blockchain Certificate Platform</div><br/>
  </div>
  <div class="card-body"><br/>
  
      <div class="text-center ma" style=" font-weight: 400;
      font-size: 14px;  text-align: center;";>Your Account has been successfully registered</div><br/>
      <div class="lastdiv_email" style=" text-align-last: center;">
      <button class="btn verifyButton_email my-md-4" style=" background-color: #512da8;
      color: white;
      font-size: 11px;
      font-weight: 500;">Confirmation Mail</button><br/>
      </div>
      <div class="login_email mt-md-3" style="  font-size: 14px;
      font-weight: 600;"><span style="color: green;">*</span>Your Login Details</div><br/>
      <table class="my-md-3">
          <tbody class="table_t_email" style="font-size: 14px;
          font-weight: 400;">
              <tr>
                  <td>Username</td>
                  <td><span class="ml-md-2">:</span> ${user.id} </td>
              </tr>
              <tr>
                  <td>Password</td>
                  <td><span class="ml-md-2">:</span>  ${user.pass} </td>
              </tr>
          </tbody>
      </table><br/>

      <div id="alert_email" class="mt-md-5"><span style="color: black;  border: 1px solid #512da8;
      padding: 1%;
      border-radius: 2px;
      text-align: center;
      font-size: 12px;
      font-weight: 500;" >*Note - Please Don't share Your Login Details</span></div>
  </div>
 
</div>`
    // html: `<h3>${user.name} Login Details</h3>
    // <p>ID: ${user.id}</p>
    // <p>Password: ${user.pass}</p>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);

 
}

// main().catch(console.error);
