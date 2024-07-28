const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.DB_URL;

//connection database
mongoose
  .connect(url)
  .then((ans) => {
    console.log("Database Connected Successful !");
  })
  .catch((err) => {
    console.log("Error in the Database Connection" + err);
  });

//user Schema
const user_Schema = new mongoose.Schema({

  name : {
    type : String,
   require : true
  },
  gmail :  {
    type : String,
   require : true
  },
  pass :  {
    type : String,
   require : true
  },
  createdAt : {
    type : String,
    require : true 
  } 

});


const otp_Schema = new mongoose.Schema({
        gmail : {
                type : String,  //mail
                require : true
         }, otp: { type: String },
        expiration: { type: Date, default: Date.now, expires: 600 }

});



    //user model
  const Users = new mongoose.model("qna_users", user_Schema);
    const Otp = new mongoose.model("otp",otp_Schema);

  module.exports = { Users,Otp}; 

  