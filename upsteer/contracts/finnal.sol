pragma solidity ^0.5.1;
pragma experimental ABIEncoderV2;
 contract finnal{
 address public admin;
 string public apassword;
 string  username;
 modifier onlyadmin{
  msg.sender==admin;
     _;
 }

 constructor (string memory _username,string memory _password) public {
   admin=msg.sender;
     username=_username;
     apassword=_password;
   
 }

 function updatepassword(string memory _username,string memory _upassword,string memory _newpassword ) public {
     
     
   if(keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(mapstu[_username].username))){
   require((keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(mapstu[_username].username)))&&(keccak256(abi.encodePacked(_upassword))==keccak256(abi.encodePacked(mapstu[_username].upassword))));
    mapstu[_username].upassword=_newpassword;
   }
   else if(keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(alls[_username].stuid))){
   require((keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(alls[_username].stuid)))&&(keccak256(abi.encodePacked(_upassword))==keccak256(abi.encodePacked(alls[_username].pass))));
    alls[_username].pass=_newpassword;
   }
    else if(keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(verlist[_username].empid))){
   require((keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(verlist[_username].empid)))&&(keccak256(abi.encodePacked(_upassword))==keccak256(abi.encodePacked(verlist[_username].verpass))));
    verlist[_username].verpass=_newpassword;
   }
     
 }
 
 
 
 
 struct user{
     address issueradd;
     string upassword;
     ustatus u;
     string uniname;
     string email;
     string username;
     uint cmm;
     uint pc;
     uint od;
     string imagehash;
 
 }
// mapping(address=>user[]) ulist;
 mapping(string=>user)public mapstu;
 //0xc42cd77309e665cba04ff0cc114f21ec1b4f24d1
 mapping(address=>bool)uregistered;
event University(address indexed addedBy, uint timestamp,address _issueradd, string  _uniname, string _email, string  _username,string _imagehash     );
 function regissuer(address _issueradd, string memory  _uniname, string memory _email, string memory _username,uint _cmm,uint _pc ,uint _od,string memory _imagehash) public  returns(bool){
  // ulist[_issueradd].push(user({issueradd:_issueradd,upassword:_password,u:ustatus.registered,uniname:_uniname,email:_email,username:_username}));
  user memory temp =user(_issueradd,_username,ustatus.registered,_uniname,_email,_username,_cmm,_pc,_od,_imagehash);
 // require( uregistered[_issueradd]==false,"user already registered");
   uregistered[_issueradd]=true;
   mapstu[_username]=temp;
   emit University(msg.sender,block.timestamp,_issueradd,_uniname,_email,_username,_imagehash);
   emit certyblock(block.number,msg.sender);
    }
   // event passwordchanged(address admin);

 
        function login(string memory _username, string memory _password) public view returns(uint  ) {
             require(keccak256(abi.encodePacked(_username))==keccak256(abi.encodePacked(username))&&(keccak256(abi.encodePacked(_password))==keccak256(abi.encodePacked(apassword))));
             return 1;  
        }
   
event certyblock(uint _blno,address fromaccount);
    enum ustatus{notregistered,registered,odgenerated,pccgenerated,cmmgenerated,extadded,intadded,verified,duplicatecert,ccc,pccverified,cmmverified,odverified,duplicatepcc,duplicatecmm,duplicateod,invalid}
    ustatus st;
   
//0x2e515449c89eda30bb3f2183434c0b4bcda37c1c
  struct student{
        string stuid;
       
        string stuname;
        string father;
        string collegename;
      ustatus st;
      string uniname;
      string stuemail;
       string deptname;
      string pass;
      uint stphne;
       string imagehash;
   
     
    }
    //  mapping(string=>student[] ) public studentlist;
      mapping(string=>bool)stureg;
   //   mapping(string=>studentcon[])studentconlist;
   mapping(string=>student) public alls;
   

event studentadded(address indexed addedby,uint timestamp,string studentid ,  string studentname , string fathername, string collegename  ,  string uniname,   string studentemail,string  deptname,uint stphonenumber,string _imagehash);
function addstudent(string memory _stuid,  string memory  _stuname, string memory  _father, string memory _collegename,  string memory _uniname,   string memory _stuemail,string memory _deptname,uint _phnum, string memory _imagehash) public {
 // require( stureg[_stuid]==false,"student already registered");
  //  studentlist[_stuid].push(student({stuid:_stuid,stuname:_stuname,father:_father,collegename:_collegename,st:ustatus.registered,uniname:_uniname,stuemail:_stuemail,deptname:_deptname}));
//alls memory temp = alls()
student memory temp = student(_stuid,_stuname,_father,_collegename,ustatus.registered,_uniname,_stuemail,_deptname,_stuname,_phnum,_imagehash);
alls[_stuid] = temp;
     stureg[_stuid]=true;
     emit studentadded(msg.sender,block.timestamp,_stuid,_stuname,_father,_collegename,_uniname,_stuemail,_deptname,_phnum,_imagehash);
      emit certyblock(block.number,msg.sender);
}
// function getstudent(string memory _stuid) public view returns(string memory stuid, string memory stuname, string memory father, string memory collegename, ustatus, string memory uniname, string memory stuemail){
//     return(alls[_stuid].stuid,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename,alls[_stuid].st,alls[_stuid].uniname,alls[_stuid].stuemail   );
// }

  uint public cmmcount;
  mapping(string=>cmmcertificate)public cmmcertbystudentid;
        function addcmmcertificate(string memory  _certid,   string memory _stuid, string memory _poy, string memory _class) public {
 
    bytes32   tcerthash=sha256(abi.encodePacked(_certid,_poy,_class,block.number,msg.sender,alls[_stuid].stuname,alls[_stuid].father));
 
      cmmcertificate memory temp=cmmcertificate(_certid,alls[_stuid].deptname,_stuid,_poy,_class,block.timestamp,msg.sender,ustatus.cmmgenerated,tcerthash,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename);  
     cmmallcerts[_certid]=temp;
    cmmcertbyhash[tcerthash]=temp;
    cmmcertbystudentid[_stuid]=temp;
    cmmcount++;

  //  allcerthash.push(tcerthash);
 emit cmmdetails(block.timestamp,_certid,alls[_stuid].deptname,_stuid,_poy,alls[_stuid].stuname,msg.sender,alls[_stuid].collegename);
  emit certyblock(block.number,msg.sender);
//       }  
//       else if (iscmmgenerated[_stuid]==true){
//           cmmcertificate memory temp=cmmcertificate(_certid,alls[_stuid].deptname,_stuid,_poy,_class,block.timestamp,msg.sender,ustatus.duplicatecmm,tcerthash,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename);  
//     cmmallcerts[_certid]=temp;
//     cmmcertbyhash[tcerthash]=temp;
//     // cmmcertbystudentid[_stuid]=temp;
//  //   allcerthash.push(tcerthash);
//  emit cmmdetails(block.timestamp,_certid,alls[_stuid].deptname,_stuid,_poy,alls[_stuid].stuname,msg.sender,alls[_stuid].collegename);
//   emit certyblock(block.number,msg.sender);
 
//       }
//       //0x1ea859a2946b01a5b5c5e9058dbfa0a23d1ba4a1feaace5ca0355c1960c506b3
       
//       iscmmgenerated[_stuid]=true;
      }
    //  function getcertificatecmm(string memory _certid) public view returns (  string memory _deptname,string memory )
    // {
    //     return( cmmallcerts[_certid].deptname,cmmallcerts[_certid].stuname );
    // }


// bytes32 [] hash;

 
 
 
 

 

 
 
 
     
               
  struct odcertificate{
        string certid;
       
     
        string deptname;
        string stuid;
       string poy;
   
       string class;
         uint timeOfIssue;
       
       address issuedby;
       ustatus st;
       bytes32 tcerthash;
          string stuname;
       string father;
         string collegename;
        // string uni;
     //  string collegename;
    }
   
    struct cmmcertificate{
        string certid;
       
     
        string deptname;
        string stuid;
       string poy;
   
       string class;
         uint timeOfIssue;
       
       address issuedby;
       ustatus st;
       bytes32 tcerthash;
       string stuname;
       string father;
         string collegename;
    //  ustatus st;
    //  string uniname;
   //   string stuemail;
       
    }
      struct pcccertificate{
        string certid;
       
     
        string deptname;
        string stuid;
       string poy;
   
       string class;
         uint timeOfIssue;
       
       address issuedby;
       ustatus st;
       bytes32 tcerthash;
          string stuname;
       string father;
         string collegename;
     //  string collegename;
    }
  //  mapping(string=>pcccertificate) pccbystudent;
       mapping(string=>pcccertificate) public  pccallcerts;
mapping(bytes32=>pcccertificate)public pcccertbyhash;
//mapping(string=>cmmcertificate) cmmbystudent;
    mapping(string=>cmmcertificate) public cmmallcerts;
mapping(bytes32=>cmmcertificate)public cmmcertbyhash;
//mapping(string=>odcertificate)public odcertbystudent;
mapping(string=>odcertificate) public odallcerts;
mapping(bytes32=>odcertificate)public odcertbyhash;
mapping(bytes32=>bytes32[]) certhash;
//mapping(address=>certificate)public certbyhasharr;
   //   bytes32 [] public allcerthash;
      event oddetails( uint timestamp, string   _certid,  string  _deptname, string  _stuid, string  _poy, string _stname,address issuedby,string collegename);
   event cmmdetails( uint timestamp, string   _certid,  string  _deptname, string  _stuid, string  _poy,string _stname,address issuedby,string collegename);
   event pccdetails( uint timestamp, string   _certid,  string  _deptname, string  _stuid, string  _poy,string _stname,address issuedby,string collegename);
   
    // mapping(string=>bool)  isodcertgenerated;
       
mapping(string=>odcertificate)public odcert;
    uint public odcount;
      function addodcertificate(string memory  _certid,   string memory _stuid, string memory _poy, string memory _class) public {
 
    bytes32   tcerthash=sha256(abi.encodePacked(_certid,_poy,_class,block.number,msg.sender));
    //  if( isodcertgenerated[_stuid]==false){
      odcertificate memory temp=odcertificate(_certid,alls[_stuid].deptname,_stuid,_poy,_class,block.timestamp,msg.sender,ustatus.odgenerated,tcerthash,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename);  
    odallcerts[_certid]=temp;
    odcertbyhash[tcerthash]=temp;
    odcert[_stuid]=temp;
   // odcount++;
 //   odcount++;
   // allcerthash.push(tcerthash);
//   isodcertgenerated[_stuid]=true;
    odcount++;
 emit oddetails(block.timestamp,_certid,alls[_stuid].deptname,_stuid,_poy,alls[_stuid].stuname,msg.sender,alls[_stuid].collegename);
    emit certyblock(block.number,msg.sender);
//       }  
//       else if (isodcertgenerated[_stuid]==true){
//             odcertificate memory temp=odcertificate(_certid,alls[_stuid].deptname,_stuid,_poy,_class,block.timestamp,msg.sender,ustatus.duplicateod,tcerthash,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename);  
//     odallcerts[_certid]=temp;
//     odcertbyhash[tcerthash]=temp;
//  //      odcount++;
//     //allcerthash.push(tcerthash);
//  emit oddetails(block.timestamp,_certid,alls[_stuid].deptname,_stuid,_poy,alls[_stuid].stuname,msg.sender,alls[_stuid].collegename);
//     emit certyblock(block.number,msg.sender);
 
//       }
//       isodcertgenerated[_stuid]=true;
      }
    //   mapping(string=>bool)  ispccgenerated;
     
  uint public pcccount;
  mapping(string=>pcccertificate)public pcccertbystudent;
             function addpcccertificate(string memory  _certid,   string memory _stuid, string memory _poy, string memory _class) public {
 
    bytes32   tcerthash=sha256(abi.encodePacked(_certid,_poy,_class,block.number,msg.sender));
        //  if( ispccgenerated[_stuid]==false){
      pcccertificate memory temp=pcccertificate(_certid,alls[_stuid].deptname,_stuid,_poy,_class,block.timestamp,msg.sender,ustatus.pccgenerated,tcerthash,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename);  
   pccallcerts[_certid]=temp;
    pcccertbyhash[tcerthash]=temp;
    pcccertbystudent[_stuid]=temp;
   pcccount++;
   //  allcerthash.push(tcerthash);
    // ispccgenerated[_stuid]=true;
 emit pccdetails(block.timestamp,_certid,alls[_stuid].deptname,_stuid,_poy,alls[_stuid].stuname,msg.sender,alls[_stuid].collegename);
    emit certyblock(block.number,msg.sender);
//       }  
//       else if (ispccgenerated[_stuid]==true){
//           pcccertificate memory temp=pcccertificate(_certid,alls[_stuid].deptname,_stuid,_poy,_class,block.timestamp,msg.sender,ustatus.duplicatepcc,tcerthash,alls[_stuid].stuname,alls[_stuid].father,alls[_stuid].collegename);  
//     pccallcerts[_certid]=temp;
//     pcccertbyhash[tcerthash]=temp;
//   //  allcerthash.push(tcerthash);
//  emit pccdetails(block.timestamp,_certid,alls[_stuid].deptname,_stuid,_poy,alls[_stuid].stuname,msg.sender,alls[_stuid].collegename);
//     emit certyblock(block.number,msg.sender);
       }
 
     
    //   function verify(bytes32 _tcerthash)public view returns(ustatus) {
    //       require(keccak256(abi.encodePacked(_tcerthash))== keccak256(abi.encodePacked(odcertbyhash[_tcerthash].tcerthash)) ||keccak256(abi.encodePacked(_tcerthash))== keccak256(abi.encodePacked(cmmcertbyhash[_tcerthash].tcerthash))||keccak256(abi.encodePacked(_tcerthash))== keccak256(abi.encodePacked(pcccertbyhash[_tcerthash].tcerthash)),"invalid hash");
    // return ustatus.verified;
   
    //   }
 
     function verify(bytes32 _tcerthash)public view returns(ustatus) {
        if(keccak256(abi.encodePacked(_tcerthash))== keccak256(abi.encodePacked(odcertbyhash[_tcerthash].tcerthash))){
     
           
             return ustatus.odverified;
        }
     
        else if(keccak256(abi.encodePacked(_tcerthash))== keccak256(abi.encodePacked(cmmcertbyhash[_tcerthash].tcerthash))){
             return ustatus.cmmverified;
        }
             else if(keccak256(abi.encodePacked(_tcerthash))== keccak256(abi.encodePacked(pcccertbyhash[_tcerthash].tcerthash))){
             return ustatus.pccverified;
        }
        else return ustatus.invalid;
      }
     
          struct ver{
         string empid;
         string vername;
         string verpass;
         string uniname;
         uint time;
       //  uint tnow;
         string companyname;
         string image;
         
         
     }
     mapping(string=>ver) public verlist;
     event Employer(string empid,string vername,string uniname,uint time,string companyname);
     
     
     
     function addver(string memory _empid,string memory _vername,string memory  _uniname,uint _time,string memory  _companyname,string memory _image)public   {
         ver memory temp=ver(_empid,_vername, _vername,_uniname,block.timestamp+_time * 4 weeks,_companyname,_image);
         verlist[_empid]=temp;
         emit Employer(_empid,_vername,_uniname,verlist[_vername].time,_companyname);
            emit certyblock(block.number,msg.sender);
     }
     uint public now; 

         function getverlist(string memory _vername) public view returns (string memory,string memory,string memory,uint,string memory,string memory ){
             require( verlist[_vername].time>block.timestamp,"time over");
          return (verlist[_vername].vername,verlist[_vername].verpass,verlist[_vername].uniname,verlist[_vername].time,verlist[_vername].companyname,verlist[_vername].image);
        }      
 

 
     
 }