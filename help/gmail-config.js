const nodemailer = require('nodemailer');
require('dotenv').config();
const user_name = process.env.MAIL_NAME;
const user_password = process.env.MAIL_PASS;



function get_HTML(txt){


    return (
        `
        <center>
      <h1> QNA VERIFICATION </h1>  
         <br><br>
         <h3>${txt} <h3>
        </center>

         `
    );
}






const send_Mail=(to_Mail,txt)=>{

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user_name,
    pass: user_password
  }
});

let mailDetails = {
  from: user_name,
  to: to_Mail,
  subject:"QNA CO.",
  html: get_HTML(txt)
};

mailTransporter.sendMail(mailDetails, (err, data) =>{
  if(err) {
    console.log('Error Occurs in Mail sending');
  } else {
    console.log('Email Sent successfully');
  }
});

  
}
module.exports={send_Mail}