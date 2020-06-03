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

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://103.67.238.177:30303"));
// console.log(web3);

const TokenArtifact1 = require('./upsteer/build/contracts/finnal.json');
const TokenArtifact2 = require('./upsteer/build/contracts/newdigital.json');

      // const Token1 = contract(TokenArtifact1);
      // const Token2 = contract(TokenArtifact2);
      // // console.log("jhbhjkjkkjkbjbkbkbkbkb",Token1);
       
      // const kar=Token1.setProvider("HTTP://103.67.238.177:6300");
      // Token2.setProvider(new Web3.providers.HttpProvider("HTTP://103.67.238.177:6300"));
      // console.log("kar",kar);
      
      const tokenInstance1 =  "0x9989101DED627342527b4a4097E1b9E4E2787580"
      const tokenInstance2 =  "0x7a2072af5024042F1d818B745CFCaE028d235FCf"
      // console.log("..........,,,,,,contarct1",tokenInstance1);
      // console.log("..........,,,,,,contarct2",tokenInstance2);
      

      this.contract =  new web3.eth.Contract(TokenArtifact1.abi,tokenInstance1);
      this.contract1 = new web3.eth.Contract(TokenArtifact2.abi,tokenInstance2);
      console.log("contarct 1",this.contract.methods);
      console.log("contract 2",this.contract1.methods);

     web3.eth.getAccounts((err, result) => {
        // console.log("accounts",result);
        this.account = result[0];
        console.log(this.account);
     });






app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3005, () => {
  console.log("The server started on port 3005 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

// /////////////// Events of Digital Certificate

app.get("/UniversityEvent", (req, res) => {

     this.contract.getPastEvents('University', { fromBlock: 0, toBlock: 'latest' }, (error, unievnt) => { })
    .then((unievnt) => {
     console.log("Data",unievnt);
     res.send(unievnt);
  })
  
});

app.get("/StudentEvent", (req, res) => {

     this.contract.getPastEvents('studentadded', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/EmplyeerEvent", (req, res) => {

     this.contract.getPastEvents('Employer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/CmmEvent", (req, res) => {

     this.contract.getPastEvents('cmmdetails', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/PccEvent", (req, res) => {

     this.contract.getPastEvents('pccdetails', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/OdEvent", (req, res) => {

     this.contract.getPastEvents('oddetails', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/Subjects", (req, res) => {

     this.contract1.getPastEvents('subjectadded', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/Internal", (req, res) => {

     this.contract1.getPastEvents('internalsadded', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/External", (req, res) => {

     this.contract1.getPastEvents('externalsadded', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/EmpVerifyList", (req, res) => {

     this.contract1.getPastEvents('verifylist', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/EmpRejectList", (req, res) => {

     this.contract1.getPastEvents('rejectedlist', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});

app.get("/Certyblock", (req, res) => {

     this.contract.getPastEvents('certyblock', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { })
    .then((event) => {
     console.log("Data",event);
     res.send(event);
  })
  
});



app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log('The mail has beed send 😃 and the id is ${info.messageId}');
    res.send(info);
  });
});

// get functions of blockchain

app.post("/admindata", (req, res) => {
 console.log("admin",req.body.uniid,req.body.password);

    this.contract.methods.login(req.body.uniid,req.body.password).call().then(result => {
      console.log("admin data", result);
               res.send(result)
        });      
});

app.post("/Universitydata", (req,res) => {
 console.log("uindata",req.body.uniid);

        this.contract.methods.mapstu(req.body.uniid).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });      
});

app.post("/studentdata", (req,res) => {
 console.log("Studenttttttt",req.body.studentid1);
//  console.log("methods",tokenInstance1);
        this.contract.methods.alls(req.body.studentid1).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/employeedata", (req, res) => {
 console.log("employeer",req.body.employeeid);
        this.contract.methods.getverlist(req.body.employeeid).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/Cmmbystudentid", (req, res) => {
 console.log("cmm",req.body.id);
        this.contract.methods.cmmcertbystudentid(req.body.id).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/Pcbystudentid", (req, res) => {
 console.log("PC",req.body.id);
        this.contract.methods.pcccertbystudent(req.body.id).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/Odbystudentid", (req, res) => {
 console.log("OD",req.body.id);
        this.contract.methods.odcert(req.body.id).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/Cmmbycertid", (req, res) => {
 console.log("cmm",req.body.cid);
        this.contract.methods.cmmallcerts(req.body.cid).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/Pcbycertid", (req, res) => {
 console.log("pc",req.body.cid);
        this.contract.methods.pccallcerts(req.body.cid).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});

app.post("/Odbycertid", (req, res) => {
 console.log("od",req.body.cid);
        this.contract.methods.odallcerts(req.body.cid).call().then(result=>{
         console.log("Data",result);
         res.send(result)
        });
      
});











// Post adding methods


app.post("/adduniversity", (req, res) => {
 console.log("university add",req.body);
     this.contract.methods.regissuer(req.body.iaddress,req.body.uname,req.body.email,req.body.username,req.body.cmm,req.body.pc,req.body.od,req.body.unimage).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log("Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});


app.post("/addemployer", (req, res) => {
 console.log("employer add",req.body);
     this.contract.methods.addver(req.body.employeerid,req.body.employeername,req.body.univeristy,req.body.duration,req.body.company,req.body.image).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" Emp Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});

app.post("/addemployer", (req, res) => {
 console.log("employer add",req.body);
     this.contract.methods.addver(req.body.employeerid,req.body.employeername,req.body.univeristy,req.body.duration,req.body.company,req.body.image).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" Emp Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});



app.post("/addstudent", (req, res) => {
 console.log("student add",req.body.student);
     this.contract.methods.addstudent(req.body.student.studentid,req.body.student.studentname,req.body.student.fathername,req.body.student.collegename,req.body.student.universityname,req.body.student.email,req.body.student.departmentname,req.body.student.phonenumber,req.body.student.images).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" student Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});

app.post("/addmarks", (req, res) => {
 console.log("marks add",req.body.student);

 if(req.body.student.sem1 === 'I-1')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem1,req.body.student.sub1,req.body.student.sub2,req.body.student.sub3,req.body.student.sub4,req.body.student.sub5).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem1,req.body.student.imark1,req.body.student.imark2,req.body.student.imark3,req.body.student.imark4,req.body.student.imark5).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" internal1 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem1,req.body.student.emark1,req.body.student.emark2,req.body.student.emark3,req.body.student.emark4,req.body.student.emark5).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext1 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })
 }

  if(req.body.student.sem2 === 'I-2')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem2,req.body.student.sub6,req.body.student.sub7,req.body.student.sub8,req.body.student.sub9,req.body.student.sub10).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" subesjest2 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem2,req.body.student.imark6,req.body.student.imark7,req.body.student.imark8,req.body.student.imark9,req.body.student.imark10).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int2 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem2,req.body.student.emark6,req.body.student.emark7,req.body.student.emark8,req.body.student.emark9,req.body.student.emark10).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext2 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     }) }

  if(req.body.student.sem3 === 'II-1')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem3,req.body.student.sub11,req.body.student.sub12,req.body.student.sub13,req.body.student.sub14,req.body.student.sub15).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){    
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem3,req.body.student.imark11,req.body.student.imark12,req.body.student.imark13,req.body.student.imark14,req.body.student.imark15).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int3 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem3,req.body.student.emark11,req.body.student.emark12,req.body.student.emark13,req.body.student.emark14,req.body.student.emark15).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext3 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     }) }

  if(req.body.student.sem4 === 'II-2')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem4,req.body.student.sub16,req.body.student.sub17,req.body.student.sub18,req.body.student.sub19,req.body.student.sub20).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem4,req.body.student.imark16,req.body.student.imark17,req.body.student.imark18,req.body.student.imark19,req.body.student.imark20).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int4 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem4,req.body.student.emark16,req.body.student.emark17,req.body.student.emark18,req.body.student.emark19,req.body.student.emark20).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext4 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })
      }

        if(req.body.student.sem5 === 'III-1')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem5,req.body.student.sub21,req.body.student.sub22,req.body.student.sub23,req.body.student.sub24,req.body.student.sub25).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem5,req.body.student.imark21,req.body.student.imark22,req.body.student.imark23,req.body.student.imark24,req.body.student.imark25).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int5 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem5,req.body.student.emark21,req.body.student.emark22,req.body.student.emark23,req.body.student.emark24,req.body.student.emark25).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext5 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })
      }

  if(req.body.student.sem6 === 'III-2')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem6,req.body.student.sub26,req.body.student.sub27,req.body.student.sub28,req.body.student.sub29,req.body.student.sub30).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem6,req.body.student.imark26,req.body.student.imark27,req.body.student.imark28,req.body.student.imark29,req.body.student.imark30).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int6 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem6,req.body.student.emark26,req.body.student.emark27,req.body.student.emark28,req.body.student.emark29,req.body.student.emark30).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext6 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })
      }

  if(req.body.student.sem7 === 'IV-1')
 {
     this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem7,req.body.student.sub31,req.body.student.sub32,req.body.student.sub33,req.body.student.sub34,req.body.student.sub35).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem7,req.body.student.imark31,req.body.student.imark32,req.body.student.imark33,req.body.student.imark34,req.body.student.imark35).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int7 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem7,req.body.student.emark31,req.body.student.emark32,req.body.student.emark33,req.body.student.emark34,req.body.student.emark35).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext7 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })
      }

  if(req.body.student.sem8 === 'IV-2')
 {
        this.contract1.methods.addsubject(req.body.student.studentid,req.body.student.sem8,req.body.student.sub36,req.body.student.sub37,req.body.student.sub38,req.body.student.sub39,req.body.student.sub40).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" sub Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error); 
            res.send(error)         
     })

          this.contract1.methods.addinnternal(req.body.student.studentid,req.body.student.sem8,req.body.student.imark36,req.body.student.imark37,req.body.student.imark38,req.body.student.imark39,req.body.student.imark40).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" int8 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })

          this.contract1.methods.addext(req.body.student.studentid,req.body.student.sem8,req.body.student.emark36,req.body.student.emark37,req.body.student.emark38,req.body.student.emark39,req.body.student.emark40).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" ext8 Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
     })
 }
      
});



app.post("/GeneateCmm", (req, res) => {
//  console.log("cmm add",req.body.student);
     this.contract.methods.addcmmcertificate(req.body.student.cmmid,req.body.student.studentid,req.body.student.passofyear,req.body.student.passclass).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" CMM Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});

app.post("/GeneatePc", (req, res) => {
//  console.log("cmm add",req.body.student);
     this.contract.methods.addpcccertificate(req.body.student.pcid,req.body.student.studentid,req.body.student.passofyear,req.body.student.passclass).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" PC Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});

app.post("/GeneateOd", (req, res) => {
//  console.log("cmm add",req.body.student);
     this.contract.methods.addodcertificate(req.body.student.odid,req.body.student.studentid,req.body.student.passofyear,req.body.student.passclass).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" OD Data",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});

app.post("/Addverifieddata", (req, res) => {
//  console.log("cmm add",req.body.student);
     this.contract1.methods.addverifierdata(req.body.studentid,req.body.company,req.body.certificateid,req.body.employee).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" Veified ",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});

app.post("/Addrejecteddata", (req, res) => {
//  console.log("cmm add",req.body.student);
     this.contract1.methods.addrejecteddata(req.body.studentid,req.body.company,req.body.certificateid,req.body.employee).send({from: this.account,gas:3000000}).on('receipt',function(receipt){
         console.log(" Rejected ",receipt);
         res.send(receipt)
     }).on('error', function(error){
           console.log(error);
            res.send(error)         
       })
      
});








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
