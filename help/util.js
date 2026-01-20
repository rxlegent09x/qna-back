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


const get_Q=()=>{

    const x = Math.floor(Math.random() * 2);
    if (x == 1) {
      //arithmetic
      const num1 = Math.floor(Math.random() * 11);
      const num2 = Math.floor(Math.random() * 11);
      const signArray = ["+", "-", "*"];
      const sign = signArray[Math.floor(Math.random() * 3)];
      const que = `${num1}${sign}${num2}=?`;
      const ans = eval(que.slice(0, -2));
    
      return ([que, ans]);
    
    }
    
    else {
      //greater&Lesser
      const num1 = Math.floor(Math.random() * 101);
      const num2 = Math.floor(Math.random() * 101);
      const num3 = Math.floor(Math.random() * 101);
      const q = Math.floor(Math.random() * 2);
      if (q == 1) {
        //greater than
        return ([`find biggest ${num1}, ${num2}, ${num3} ?`, Math.max(num1, num2, num3)]);
      }
      else {
        //less than
        return ([`find smallest ${num1}, ${num2}, ${num3} ?`, Math.min(num1, num2, num3)]);
      }
    
    }
    }










module.exports={encryption,decryption,is_Valid,get_Q};



