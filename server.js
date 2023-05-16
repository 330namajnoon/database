const http = require("http");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdp = path.join(__dirname, "./");
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.static(pdp));
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server is up on port ${port}!`);
})

app.post("/login", multer().none(), (req, res) => {
    fs.readFile(`./database/users.json`, (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data.toString());
        let user = JSON.parse(req.body.data);
        let t = false;
        users.forEach(u => {
            if (u.userName == user.userName && u.password == user.password) {
                t = true
            }
        })
        if (t) {
            fs.readFile(`./database/${user.userName}/userData.json`, (err, data) => {
                let d = JSON.parse(data);
                res.send(JSON.stringify(d.databases));
            })
        } else {
            res.send(JSON.stringify(t));

        }
    })

})
app.post("/signup", multer().none(), (req, res) => {
    fs.readFile(`./database/users.json`, (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data.toString());
        let newUser = JSON.parse(req.body.data);
        let t = false;
        users.forEach(u => {
            if (u.userName == newUser.userName) t = true;
        })
        if (t) {
            res.send("Este usuario ya existe!");
        } else {
            users.push(newUser);
            fs.writeFile(`./database/users.json`, JSON.stringify(users), (err) => {
                if (err) throw err;
                fs.mkdirSync(`./database/${newUser.userName}`);
                newUser.databases = [];
                fs.appendFileSync(`./database/${newUser.userName}/userData.json`, JSON.stringify(newUser));
                res.send(true);
            })
        }
    })

})

app.post("/createDatabase", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName}/userData.json`, (err, data) => {
        if (err) throw err;
        let userData = JSON.parse(data.toString());
        let searche = userData.databases.find(d => d.databaseName == req.body.databaseName);
        if (!searche) {

            userData.databases.push({ databaseName: req.body.databaseName, tables: [] });
            fs.writeFile(`./database/${req.body.userName}/userData.json`, JSON.stringify(userData), (err) => {
                fs.mkdirSync(`./database/${req.body.userName + '/' + req.body.databaseName}`);
                res.send(JSON.stringify(userData.databases));
            })
        } else {
            res.send(JSON.stringify(false));
        }

    })

})
app.post("/createTable", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName}/userData.json`, (err, data) => {
        if (err) throw err;
        let userData = JSON.parse(data.toString());
        let searche = userData.databases.find(d => d.databaseName == req.body.databaseName);
        if (searche) {
            let tSearch = userData.databases.find(d => d.databaseName == req.body.databaseName).tables.find(t => t.tableName == req.body.tableName);
            if (!tSearch) {
                let database = userData.databases.find(d => d.databaseName == req.body.databaseName);
                database.tables.push({ databaseName: req.body.databaseName, tableName: req.body.tableName });
                fs.writeFile(`./database/${req.body.userName}/userData.json`, JSON.stringify(userData), (err) => {
                    fs.appendFileSync(`./database/${req.body.userName}/${req.body.databaseName}/${req.body.tableName}.json`, JSON.stringify([]));
                    res.send(JSON.stringify(userData.databases));
                })
            } else {
                res.send(JSON.stringify(false));
            }


        } else {
            res.send(JSON.stringify(false));
        }

    })

})

app.post("/uploadData", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, (err, data) => {
        if (err) res.send(JSON.stringify(false));
        let tableData = JSON.parse(data.toString());
        let newData;
        if(tableData.length > 0 ) {
            newData = {id:tableData[tableData.length-1].id+1,data:JSON.parse(req.body.data)};
        }else {
            newData = {id:1,data:JSON.parse(req.body.data)};
        }
        tableData.push(newData);

        fs.writeFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, JSON.stringify(tableData), (err) => {
            if (err) res.send(JSON.stringify(false));
            res.send(JSON.stringify(tableData));
        })
    })
})
app.post("/deleteData", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, (err, data) => {
        if (err) res.send(JSON.stringify(false));
        fs.writeFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, JSON.stringify([]), (err) => {
            if (err) res.send(JSON.stringify(false));
            res.send('se ha borrado los datos correctamente!');
        })
    })
})
app.post("/deleteDataById", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, (err, data) => {
        if (err) res.send(JSON.stringify(false));
        let newdata = JSON.parse(data.toString()).filter(d => d.id !== parseInt(req.body.id));
        fs.writeFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, JSON.stringify(newdata), (err) => {
            if (err) res.send(JSON.stringify(false));
            res.send(JSON.stringify(newdata));
        })
    })
})
app.post("/updateDataById", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, (err, data) => {
        if (err) res.send(JSON.stringify(false));
        let newdata = JSON.parse(data.toString()).map(d => {
            let data = d;
            if(data.id == req.body.id) data = JSON.parse(req.body.data);
            return data;
        });
        fs.writeFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, JSON.stringify(newdata), (err) => {
            if (err) res.send(JSON.stringify(false));
            res.send(JSON.stringify(newdata));
        })
    })
})
app.post("/deleteTable", multer().none(), (req, res) => {

    fs.readFile(`./database/${req.body.userName}/userData.json`, (err, data) => {
        if (err) throw err;
        let userData = JSON.parse(data.toString());
        userData.databases = userData.databases.map(d => {
            let database = d;
            if (d.databaseName == req.body.databaseName) {
                database.tables = database.tables.filter(t => t.tableName !== req.body.tableName);

            }
            return database;
        })
        fs.writeFile(`./database/${req.body.userName}/userData.json`, JSON.stringify(userData), (err) => {
            if (err) throw err;
            try {
                fs.unlinkSync(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`);
                res.send(JSON.stringify(userData.databases));
            } catch (error) {
                res.send(error);
            }
        })

    })


})
app.post("/deleteDatabase", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName}/userData.json`, (err, data) => {
        if (err) throw err;
        let userData = JSON.parse(data.toString());
        userData.databases = userData.databases.filter(d => d.databaseName !== req.body.databaseName);
        fs.writeFile(`./database/${req.body.userName}/userData.json`, JSON.stringify(userData), (err) => {
            if (err) throw err;
            try {
                fs.rmSync(`./database/${req.body.userName + '/' + req.body.databaseName}`, { recursive: true, force: true });
                res.send(JSON.stringify(userData.databases));
            } catch (error) {
                res.send(error);
            }
        })

    })
   

})
app.post("/deleteAccont", multer().none(), (req, res) => {
    fs.readFile(`./database/users.json`, (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data.toString());
        let user = users.find(u => u.userName == req.body.userName && u.password == req.body.password);
        if(user) {
            users = users.filter(u => u.userName !== req.body.userName);
            fs.writeFile(`./database/users.json`, JSON.stringify(users), (err) => {
                if (err) throw err;
                try {
                    fs.rmSync(`./database/${req.body.userName}`, { recursive: true, force: true });
                    res.send("se ha borrado correctamente!");
                } catch (error) {
                    res.send(error);
                }
            })
        }else {
            res.send("este usuario no existe!");
        }
        

    })
   

})
app.post("/downloadData", multer().none(), (req, res) => {
    fs.readFile(`./database/${req.body.userName + '/' + req.body.databaseName + '/' + req.body.tableName}.json`, (err, data) => {
        if (err) res.send(JSON.stringify(false));
        res.send(data.toString());
    })
})
