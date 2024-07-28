const CryptoJS = require('crypto-js');
require('dotenv').config();

const encryption=(data="")=>{
   if(data.trim().length){
    const passphrase = process.env.SECRET_KEY;
   return CryptoJS.AES.encrypt(data, passphrase).toString();
   }
   return -1;
}
const decryption=(data="")=>{
   if(data.trim().length){
    const passphrase = process.env.SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(data, passphrase);

  return bytes.toString(CryptoJS.enc.Utf8);
   }
   return -1;

}


const is_Valid=({name=undefined,gmail=undefined,pass=undefined})=>{
  
  // console.log(name,gmail,pass);
  const isAlpha = str => /^[a-zA-Z]*$/.test(str);

     if(gmail!=undefined){
      if(!(gmail.trim().length>=6 && gmail.trim().length<=30 && gmail.endsWith("@gmail.com") )){
         //check gmail
         return({
           status:false,
           msg:"Please enter a valid gmail !"
         });
     }
    if(name==undefined && pass==undefined){
      return({
         status:true
       });
    }
   }
     if(name!=undefined){
      if(!(name.trim().length>=3 && name.trim().length<=20 && isAlpha(name[0])==true)) {
         //check username 
        return ({
          status:false,
          msg:"Please enter a valid username !"
        });
    
      }
      if(pass==undefined){
         return({
            status:true
          });
      }
     }
     if(pass!=undefined){
      if(!(pass.trim().length>=3 && pass.trim().length<=9)){
         //check pass
         return({
           status:false,
           msg:"Please enter a valid password !"
         });
         
       }
       return({
         status:true,
       });
      }
   
      return({
         status:false,
         msg:"Please enter a valid name , gmail & password !"
       });
 }













module.exports={encryption,decryption,is_Valid};