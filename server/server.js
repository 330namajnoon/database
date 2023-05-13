const http = require("http");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
const server = http.createServer(app);
server.listen(port , ()=> {
    console.log(`server is up on port ${port}!`);
})

app.post("/login",multer().none(),(req,res)=> {
    fs.readFile(`./database/${req.body.databaseName}.json`,(err,data)=> {
        if(err) throw err;
        let users = JSON.parse(data.toString());
        let user = JSON.parse(req.body.data);
        let t = false;
        users.forEach(u => {
            if(u.username == user.username && u.password == user.password) {
                t = true;
            }
        })
        res.send(t);
    })
   
})
app.post("/signup",multer().none(),(req,res)=> {
    fs.readFile(`./database/${req.body.databaseName}.json`,(err,data)=> {
        if(err) throw err;
        let users = JSON.parse(data.toString());
        let newUser = JSON.parse(req.body.data);
        let t = false;
        users.forEach(u => {
            if(u.username == newUser.username) t = true;
        })
        if(t) {
            res.send("Este usuario ya existe!");
        }else {
            users.push(newUser);
            fs.writeFile(`./database/${req.body.databaseName}.json`,JSON.stringify(users),(err)=> {
                if(err) throw err;
                fs.mkdirSync(`./database/${newUser.username}`);
                fs.appendFileSync(`./database/${newUser.username}/userData.json`,JSON.stringify(newUser));
                res.send(true);
            })
        }
    })

})