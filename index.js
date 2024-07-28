const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send({
    "status":true,
    "txt":"QNA Server is Listening..."
  });
});

const { apion } = require("./help/api-config.js");
const { encryption,decryption } = require("./help/util.js");
apion(app);



server.listen(PORT, () => {
    console.log("QNA Server Is Listening ...on PORT : ",PORT);
  });



 