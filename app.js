const express = require('express');
const user = require('./routes/users');
const config = require ('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
const cors = require('cors');
const app= express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(cors());


// parse application/x-www-form-urlencoded
//request read as json
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// app.use(passport.initialize());
// app.use(passport.session());

//give path of static files
//path is "public" folder of current directory
// app.use(express.static (path.join(__dirname,"public")));
// require ('./config/passport')(passport);

const connection  = mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
if(connection){
    console.log("database connected");

}
else{
    console.log("Error connection");
}



app.use("/user",user);

// app.use(express.static("./client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.get("/",function(req,res){
    res.send("hello im server");
});

app.listen(port,function() {
    console.log("port is "  + port);
});




// const express = require ('express');
// const app = express();
// const port = 3000;

// app.get("/",function(req,res){
//     res.end("hello world");
// })
// app.listen(port,function(){
//     console.log("server is running port " + port);

// });