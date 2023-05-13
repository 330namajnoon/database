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
    fs.readFile(`./database/users.json`,(err,data)=> {
        if(err) throw err;
        let users = JSON.parse(data.toString());
        let user = JSON.parse(req.body.data);
        let t = false;
        users.forEach(u => {
            if(u.userName == user.userName && u.password == user.password) {
               t = true
            }
        })
        if(t) {
            fs.readFile(`./database/${user.userName}/userData.json`,(err,data)=> {
                let d = JSON.parse(data);
                res.send(JSON.stringify(d.databases));
            })
        }else {
            res.send(JSON.stringify(t));

        }
    })
   
})
app.post("/signup",multer().none(),(req,res)=> {
    fs.readFile(`./database/users.json`,(err,data)=> {
        if(err) throw err;
        let users = JSON.parse(data.toString());
        let newUser = JSON.parse(req.body.data);
        let t = false;
        users.forEach(u => {
            if(u.userName == newUser.userName) t = true;
        })
        if(t) {
            res.send("Este usuario ya existe!");
        }else {
            users.push(newUser);
            fs.writeFile(`./database/users.json`,JSON.stringify(users),(err)=> {
                if(err) throw err;
                fs.mkdirSync(`./database/${newUser.userName}`);
                newUser.databases = [];
                fs.appendFileSync(`./database/${newUser.userName}/userData.json`,JSON.stringify(newUser));
                res.send(true);
            })
        }
    })

})

app.post("/createDatabase",multer().none(),(req,res)=> {
    fs.readFile(`./database/${req.body.userName}/userData.json`,(err,data)=> {
        if(err) throw err;
        let userData = JSON.parse(data.toString());
        let searche = userData.databases.find(d => d.databaseName == req.body.databaseName);
        if(!searche){

            userData.databases.push({databaseName:req.body.databaseName,tables:[]});
            fs.writeFile(`./database/${req.body.userName}/userData.json`,JSON.stringify(userData),(err)=> {
                fs.mkdirSync(`./database/${req.body.userName+'/'+req.body.databaseName}`);
                res.send(JSON.stringify(userData.databases));
            })
        }else {
            res.send(JSON.stringify(false));
        }
     
    })
   
})
app.post("/createTable",multer().none(),(req,res)=> {
    fs.readFile(`./database/${req.body.userName}/userData.json`,(err,data)=> {
        if(err) throw err;
        let userData = JSON.parse(data.toString());
        let searche = userData.databases.find(d => d.databaseName == req.body.databaseName);
        if(searche){
            let tSearch = userData.databases.find(d => d.databaseName == req.body.databaseName).tables.find(t => t.tableName == req.body.tableName);
            if(!tSearch) {
                let database = userData.databases.find(d => d.databaseName == req.body.databaseName);
                database.tables.push({databaseName:req.body.databaseName,tableName:req.body.tableName});
                fs.writeFile(`./database/${req.body.userName}/userData.json`,JSON.stringify(userData),(err)=> {
                    fs.appendFileSync(`./database/${req.body.userName}/${req.body.databaseName}/${req.body.tableName}.json`,JSON.stringify([]));
                    res.send(JSON.stringify(userData.databases));
                })
            }else {
                res.send(JSON.stringify(false));
            }
           
           
        }else {
            res.send(JSON.stringify(false));
        }
     
    })
   
})

app.post("/uploadData",multer().none(),(req,res)=> {
    fs.readFile(`./database/${req.body.userName+'/'+req.body.databaseName+'/'+req.body.tableName}.json`,(err,data)=> {
        if(err) res.send(JSON.stringify(false));
        let tableData = JSON.parse(data.toString());
        tableData.push(JSON.parse(req.body.data));
        console.log(tableData)
        fs.writeFile(`./database/${req.body.userName+'/'+req.body.tableName}.json`,JSON.stringify(tableData),(err)=> {
            if(err) res.send(JSON.stringify(false));
            res.send('se ha guardado correctamente!');
        })
    })
})
app.post("/downloadData",multer().none(),(req,res)=> {
    fs.readFile(`./database/${req.body.userName+'/'+req.body.tableName}.json`,(err,data)=> {
        if(err) res.send(JSON.stringify(false));
        res.send(data.toString());
    })
})
