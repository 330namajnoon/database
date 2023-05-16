
export default function SinaSQL() {
    this.hostURL = 'https://heady-mulberry-respect.glitch.me/';
    this.connected = { connected: false, databases: [] };
    this.userData = { userName: '', password: '' };
}
SinaSQL.prototype.getUserData = function () {
    return this.userData;
};
SinaSQL.prototype.getDataBases = function () {
    return this.connected.databases;
};
SinaSQL.prototype.setHostUrl = function (hostURL) {
    this.hostURL = hostURL;
};
SinaSQL.prototype.setDataBases = function (databases) {
    this.connected.databases = databases;
};

SinaSQL.prototype.setUserData = function (userData) {
    this.userData = userData;
};
SinaSQL.prototype.connect = function (userName, password) {
    var _this = this;
    return new Promise(function (resolve) {
        var http = new XMLHttpRequest();
        var formData = new FormData();
        var userData = {
            userName: userName,
            password: password
        };
        formData.append('data', JSON.stringify(userData));
        http.open('POST', _this.hostURL + 'login', true);
        var c = _this.connected;
        var setUserData = _this.setUserData.bind(_this);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                if (JSON.parse(http.responseText)) {
                    c.connected = true;
                    c.databases = JSON.parse(http.responseText);
                    setUserData(userData);
                }
                else {
                    c.connected = false;
                }
                resolve(c.connected);
            }
        };
        http.send(formData);
    });
};
SinaSQL.prototype.signup = function (userName = "", email = "", password = "") {
    if(userName&&email&&password) {
        var _this = this;
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            var newUser = {
                userName: userName,
                email: email,
                password: password
            };
            formData.append('data', JSON.stringify(newUser));
            http.open('POST', _this.hostURL + 'signup', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    var res = userName;
                    http.responseText == 'true' ? localStorage.setItem('user', userName) : res = 'este usuario ya existe';
                    resolve(res);
                }
            };
            http.send(formData);
        });
    }else {
        return false
    }
   
};
SinaSQL.prototype.uploadData = function (databaseName, tableName, data) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('tableName', tableName);
            formData.append('databaseName', databaseName);
            formData.append('data', JSON.stringify(data));
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'uploadData', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
};
SinaSQL.prototype.uploadDataById = function (databaseName , tableName,id, data) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('tableName', tableName);
            formData.append('databaseName', databaseName);
            formData.append('data', JSON.stringify(data));
            formData.append('id', id);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'addData', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
};
SinaSQL.prototype.downloadData = function (databaseName, tableName) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('tableName', tableName);
            formData.append('databaseName', databaseName);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'downloadData', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
};
SinaSQL.prototype.deleteData = function (databaseName, tableName) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('tableName', tableName);
            formData.append('databaseName', databaseName);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'deleteData', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
}
SinaSQL.prototype.deleteDataById = function (databaseName = "", tableName = "" , id = 1) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('tableName', tableName);
            formData.append('databaseName', databaseName);
            formData.append('userName', _this.getUserData().userName);
            formData.append("id",id);
            http.open('POST', _this.hostURL + 'deleteDataById', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
}
SinaSQL.prototype.deleteTable = function (databaseName, tableName) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('tableName', tableName);
            formData.append('databaseName', databaseName);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'deleteTable', true);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    _this.setDataBases(JSON.parse(http.responseText));
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
}
SinaSQL.prototype.deleteDatabase = function (databaseName) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('databaseName', databaseName);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'deleteDatabase', true);

            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    _this.setDataBases(JSON.parse(http.responseText));
                    resolve(http.responseText);
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
}
SinaSQL.prototype.deleteAccont = function (userName, password) {
    var _this = this;
    return new Promise(function (resolve) {
        var http = new XMLHttpRequest();
        var formData = new FormData();
        formData.append('password', password);
        formData.append('userName',userName);
        http.open('POST', _this.hostURL + 'deleteAccont', true);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                resolve(http.responseText);
            }
        };
        http.send(formData);
    });


}
SinaSQL.prototype.createDatabase = function (databaseName) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('databaseName', databaseName);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'createDatabase', true);
            var setDatabase = _this.setDataBases.bind(_this);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    if (JSON.parse(http.responseText))
                        setDatabase(JSON.parse(http.responseText));
                    resolve(JSON.parse(http.responseText));
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
};
SinaSQL.prototype.createTable = function (databaseName, tableName) {
    var _this = this;
    if (this.connected.connected) {
        return new Promise(function (resolve) {
            var http = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('databaseName', databaseName);
            formData.append('tableName', tableName);
            formData.append('userName', _this.getUserData().userName);
            http.open('POST', _this.hostURL + 'createTable', true);
            var setDatabase = _this.setDataBases.bind(_this);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    if (JSON.parse(http.responseText))
                        setDatabase(JSON.parse(http.responseText));
                    resolve(JSON.parse(http.responseText));
                }
            };
            http.send(formData);
        });
    }
    else {
        return 'no estas connectado!';
    }
};

SinaSQL.prototype.generate = async function(
    userName = "",
    email = "",
    password = "",
    databases = ["users"],
    tables = [{databaseName:"",tableName}],
) {
    if(userName&&email&&password&&databases&&tables) {
        let _this = this;
        await this.deleteAccont(userName,password);
        await this.signup(userName,email,password);
        await this.connect(userName,password);
        databases.forEach( async( d )=> {
            await _this.createDatabase(d);
        })
        tables.forEach( async( d )=> {
            await _this.createTable(d.databaseName,d.tableName);
        })
        return true;
    }else {
        return false;
    }
    
}

