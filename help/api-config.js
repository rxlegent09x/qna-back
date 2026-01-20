

const { decryption, encryption, is_Valid } = require("./util.js");
const { Users, Otp, Dtx } = require("./db-config.js");
const { send_Mail } = require("./gmail-config.js");
const {get_Q} = require("./util");







const save_data=(req,res,full_data)=>{

    const time = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});

    full_data = {...full_data,pass:encryption(full_data.pass),createdAt:time};
    const u = new Users(full_data);
    u.save().then(re => {
        // delete re.pass;
        const enc_dt = encryption(JSON.stringify(re));
        const sms = `<p>You Succesfully Registered In qna , Now You Can Login In Your Account Using Gmail : ${re.gmail} & Password : ${decryption(re.pass)} ! </p>`;
        //send mail

        send_Mail(full_data.gmail, sms);
        return res.send({
            "status": true,
            "txt": "user data saved !",
            "data": enc_dt
        });
       

    }).catch(err => {
        console.log(err);
        return res.send({
            "status": false,
            "txt": "user data not saved due to server error !"
        });
    })
  
}


const apion = (app) => {

    console.log("Api Server is [ON]");


    app.post("/signup", (req, res) => {

        const { gmail, name, pass, otp } = JSON.parse(decryption(req.body.enc_dt));

        //check mail exist or not in database
        Otp.findOne({ "gmail": gmail, "otp": otp }).then((trex) => {

            if (trex != null) {

                //otp is right

                //check user gmail exist or not
                Users.findOne({
                    "gmail": gmail
                }).then(trex => { 
                    if (trex != null) {
                        //user exist
                        return res.send({
                            "status": false,
                            "txt": "user mail already exist !"
                        });
                       
                    }
                 const tmp_con = is_Valid({ gmail, name, pass });
                    if (tmp_con.status) {



                        const full_data = {
                            "gmail": gmail,
                            "name": name,
                            "pass": pass,
                        };
                        //save data
                        //demo
                        
                        save_data(req,res,full_data);



                    } else {

                        return res.send({
                            "status": false,
                            "txt": "user data not valid !"+tmp_con.msg
                        });
                       
                    }

                }).catch(err => {

                    return res.send({
                        "status": false,
                        "txt": "something went wrong due to server error in gmail existance !"+err
                    });
                    
                });
            }else{
               return res.send({
                    "status": false,
                    "txt": "otp was wrong !"
                });
            }

            }).catch(err => {
                console.log(err);
                
                return res.send({
                    "status": false,
                    "txt": "something went wrong in check otp !"
                });
              
            });


        
        });
    
    






app.post("/login", (req, res) => {

    //check data in database

    const data = JSON.parse(decryption(req.body.enc_dt));
    const {gmail,pass} = data;
    
    Users.findOne({ "gmail":gmail}).then((trex) => {
        if (trex != null) {
           if(decryption(trex.pass)==pass){
            return res.status(200).json({
                "status": true,
                "txt": "it's a valid user !",
                "data": encryption(JSON.stringify(trex))
            });
           }else{
           return res.status(404).json({
                "status": false,
                "txt": "it's not a valid user !"
            });
           }
        }

        return res.status(404).json({
            "status": false,
            "txt": "it's not a valid user !"
        });
        

    }).catch(err => {
        return res.status(404).json({
            "status": false,
            "txt": "something went wrong !"
        });
        console.log(err);
        
    });

   

});


//completed
app.post("/forget-pass", (req, res) => {

    //check mail valid or not

    const gmail = decryption(req.body.enc_data);


    Users.findOne({ "gmail": gmail }).then((trex) => {
        if (trex != null) {
            //send password to password
            send_Mail(gmail, "Your Password is : " + decryption(trex.pass));

            res.send({
                status: true,
                txt: "password has been sent to gmail"
            });

        } else {
            res.send({
                status: false,
                txt: "gmail not found"
            });
        }
    }).catch(err => {
        res.send({
            status: false,
            txt: "due to internal error"
        })
    });





});



//completed
app.post("/send-otp", (req, res) => {

    //otp verification



    const gmail = decryption(req.body.enc_dt);

    const otp = Math.floor((Math.random() * 9000)+999);
   
    //save in db
    const opt = { upsert: true, new: true, setDefaultsOnInsert: true };
    const updt = {
        "gmail": gmail,
        "otp": otp
    };
    Otp.findOneAndUpdate(
{
    "gmail":gmail
},updt,opt).then(trex => {
    send_Mail(gmail, "OTP : " + otp);
        res.send({
            status: true,
            txt: "otp has been sent"
        });
        
    }).catch(err => {
        console.log(err);
        res.send({
            status: false,
            txt: "otp has not been sent due to internal error"
        });
    });



});



app.post("/check-existance",(req,res)=>{
        if(req.body.trim().length){

            const dt = JSON.stringify(decryption(req.body));
            Users.findOne({dt}).then(res=>{
                if(res==null){
                    return res.send({
                        status:false,
                        txt:"user not valid"
                    })
                }
                return res.send({
                    status:true,
                    txt:"user is valid",
                    data:encryption(JSON.stringify(res))
                })
            })
        }
});



    app.get("/get-qna", (req, res) => {


const srmq = get_Q();

res.json({
    "question":srmq[0],
    "answer":srmq[1],
    status:"true"
});

});


app.post("/set-loc",(req,res)=>{
    
const data = req.body;
    const c_dtx = new Dtx({
lat:data.lat,
long:data.long
    });

    c_dtx.save().then((ans)=>{
    res.send({
        status:"true"
    });
}).catch(err=>
    console.log(err)
)


   
    
});


app.get("/get-loc",(req,res)=>{
    
    Dtx.find({}).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send("error in database");
    })
    
})
    


    



}





module.exports = { apion };


