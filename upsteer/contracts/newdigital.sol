pragma solidity ^0.5.11;
import "./finnal.sol";

contract newdigital{
   
    finnal  f;
     constructor(address _finnal) public {
        f = finnal(_finnal);
    }
     
 event verifylist(string stuid ,string companyname,string certid,string empid,uint verifiedtime);
      function addverifierdata(string memory stuid,string memory companyname,string memory certid,string memory empid) public {
          //require;
          emit verifylist(stuid,companyname,certid,empid,block.timestamp);
      }
      
 event rejectedlist(string stuid ,string companyname,string certid,string empid,uint rejectedtime);
      function addrejecteddata(string memory stuid,string memory companyname,string memory certid,string memory empid) public {
          //require;
          emit rejectedlist(stuid,companyname,certid,empid,block.timestamp);
      }      


 
   
     
     
  struct internalm{
      string stuid;
     string sem;
     uint mark1;
        uint mark2;
           uint mark3;
             uint mark4;
               uint mark5;
 }
  struct externalm{
      string stuid;
     string sem;
     uint mark1;
        uint mark2;
           uint mark3;
             uint mark4;
               uint mark5;
               
             //   internalm mm;
 }
 
struct subject{
      string stuid;
     string sem;
     string sub1;
        string sub2;
           string sub3;
             string sub4;
               string sub5;
         
 }
  mapping(string=>internalm[])public stuinterwise;
 
 mapping(string=>externalm[])public stuexternalwise;
   mapping(string=>subject[])public subjectwise;


// bytes32 [] hash;
event certyblock(uint _blno,uint time,address from);
event subjectadded(address indexed addedby,uint timestamp,string  _stuid, string  _sem, string  _sub1, string  _sub2, string  _sub3, string  _sub4, string  _sub5 );
 function addsubject(string memory _stuid, string memory _sem, string memory _sub1, string memory _sub2, string memory _sub3, string memory _sub4, string memory _sub5) public {
  //require(stureg[_stuid]==true,"student not registered");
 
     subjectwise[_stuid].push(subject({stuid:_stuid,sem:_sem,sub1:_sub1,sub2:_sub2,sub3:_sub3,sub4:_sub4,sub5:_sub5}));
     emit subjectadded(msg.sender,block.timestamp,_stuid, _sem,_sub1,_sub2, _sub3,_sub4,_sub5);
//subject memory temp=subject(_stuid, _sem,_sub1,_sub2, _subk3,_sub4,_sub5);
   emit certyblock(block.number,block.timestamp,msg.sender);
 }
   
 event externalsadded(address indexed addedby,uint timestamp, string _stid,string _sem,uint mark1,uint mark2,uint mark3,uint mark4,uint mark5);
   event internalsadded( address indexed addedby,uint timestamp,string _stid,string _sem,uint mark1,uint mark2,uint mark3,uint mark4,uint mark5);
 function addinnternal(string memory _stuid, string memory _sem, uint _mark1, uint _mark2, uint _mark3, uint _mark4, uint _mark5)public {
     stuinterwise[_sem].push(internalm({stuid:_stuid,sem:_sem,mark1:_mark1,mark2:_mark2,mark3:_mark3,mark4:_mark4,mark5:_mark5}));
//require(stureg[_stuid]==true,"student not registered");
  emit internalsadded( msg.sender,block.timestamp, _stuid, _sem, _mark1,_mark2,_mark3,_mark4,_mark5);
     emit certyblock(block.number,block.timestamp,msg.sender);
 }
  function addext(string memory _stuid, string memory _sem, uint _mark1, uint _mark2, uint _mark3, uint _mark4, uint _mark5)public {
     stuexternalwise[_sem].push(externalm({stuid:_stuid,sem:_sem,mark1:_mark1,mark2:_mark2,mark3:_mark3,mark4:_mark4,mark5:_mark5}));
 // require(stureg[_stuid]==true,"student not registered");  
 // ustatus[_stuid]=st.ext  added;
    emit externalsadded( msg.sender,block.timestamp, _stuid, _sem, _mark1,_mark2,_mark3,_mark4,_mark5);
      emit certyblock(block.number,block.timestamp,msg.sender);
 }

}