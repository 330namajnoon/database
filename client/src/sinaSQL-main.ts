interface IUserData {
  userName:string;
  password:string;
}
interface IUser {
  userName:string;
  email:string;
  password:string;
}
interface ILogin {
  userName:string;
  password:string;
}

interface ITables {
  databaseName:string;
  tableName:string;
}
interface IDatabases {
  databaseName:string;
  tables:ITables[];
}
interface IConnected {
  connected:boolean;
  databases:IDatabases[];
}

export default class SinaSQL {
  private hostURL:string = 'http://localhost:4000/';
  private connected:IConnected = {connected:false,databases:[]};
  private userData:IUserData = {userName:'',password:''};

  getUserData():IUserData {
    return this.userData;
  }

  setHostUrl(hostURL:string):void {
    this.hostURL = hostURL;
  }

  setDataBases(databases:IDatabases[]):void {
    this.connected.databases = databases;
  }

  setUserData(userData:IUserData):void {
    this.userData = userData;
  }
  connect(userName:string,password:string):any {
    return new Promise((resolve)=> {
      const http:XMLHttpRequest = new XMLHttpRequest();
      const formData = new FormData();
      const userData:IUserData = {
        userName,
        password
      }
      formData.append('data',JSON.stringify(userData));
      http.open('POST',this.hostURL+'login',true);
      let c:IConnected = this.connected;
      let setUserData = this.setUserData.bind(this);
      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200 ) {
          if(JSON.parse(http.responseText)) {
            c.connected = true;
            c.databases = JSON.parse(http.responseText);
            setUserData(userData)
          }else {
            c.connected = false;
          }
          resolve(c.connected);
        }
      }
      http.send(formData);
    })



  }

  signup(userName:string,email:string,password:string):any {

      return new Promise((resolve)=> {
        const http:XMLHttpRequest = new XMLHttpRequest();
        const formData = new FormData();
        const newUser:IUser = {
          userName,
          email,
          password
        }
        formData.append('data',JSON.stringify(newUser));
        http.open('POST',this.hostURL+'signup',true);
        http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200 ) {
            let res:string = userName;
            http.responseText == 'true' ? localStorage.setItem('user',userName) : res = 'este usuario ya existe';

            resolve(res);
          }
        }
        http.send(formData);
      })

  }

  uploadData(databaseName:string,tableName:string,data:any):any {
    if(this.connected.connected) {
      return new Promise((resolve)=> {
        const http:XMLHttpRequest = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('tableName',tableName);
        formData.append('databaseName',databaseName);
        formData.append('data',JSON.stringify(data));
        formData.append('userName',this.getUserData().userName);
        http.open('POST',this.hostURL+'uploadData',true);
        http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200 ) {
            resolve(http.responseText);
          }
        }
        http.send(formData);
      })
    }else {
      return 'no estas connectado!';
    }

  }

  downloadData(databaseName:string,tableName:string):any {
    if(this.connected.connected) {

      return new Promise((resolve)=> {
        const http:XMLHttpRequest = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('tableName',tableName);
        formData.append('databaseName',databaseName);
        formData.append('userName',this.getUserData().userName);
        http.open('POST',this.hostURL+'downloadData',true);
        http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200 ) {
            resolve(http.responseText);
          }
        }
        http.send();
      })
    }else {
      return 'no estas connectado!';
    }

  }

  createDatabase(databaseName:string):any {
    if(this.connected.connected) {
      return new Promise((resolve)=> {
        const http:XMLHttpRequest = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('databaseName',databaseName);
        formData.append('userName',this.getUserData().userName);
        http.open('POST',this.hostURL+'createDatabase',true);
        let setDatabase = this.setDataBases.bind(this);
        http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200 ) {
            if(JSON.parse(http.responseText)) setDatabase(JSON.parse(http.responseText));
            resolve(JSON.parse(http.responseText));
          }
        }
        http.send(formData);
      })
    }else {
      return 'no estas connectado!';
    }
  }

  createTable(databaseName:string,tableName:string):any {
    if(this.connected.connected) {
      return new Promise((resolve)=> {
        const http:XMLHttpRequest = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('databaseName',databaseName);
        formData.append('tableName',tableName);
        formData.append('userName',this.getUserData().userName);
        http.open('POST',this.hostURL+'createTable',true);
        let setDatabase = this.setDataBases.bind(this);
        http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200 ) {
            if(JSON.parse(http.responseText)) setDatabase(JSON.parse(http.responseText));
            resolve(JSON.parse(http.responseText));
          }
        }
        http.send(formData);
      })
    }else {
      return 'no estas connectado!';
    }
  }



}
