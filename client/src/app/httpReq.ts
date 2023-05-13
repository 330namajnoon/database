const HOST:string = "http://localhost:4000"; 

export default function httpReq(data = {method: "POST" || "GET",url: HOST,data:{},databaseName:"users"}):any {
    return new Promise((resolve)=> {
        const formdata:FormData = new FormData();
        data.databaseName ? formdata.append("databaseName",data.databaseName):null;
        data.data ? formdata.append("data",JSON.stringify(data.data)):null;
        const http:XMLHttpRequest = new XMLHttpRequest();
        http.open(data.method,HOST + data.url,true);
        http.onreadystatechange = function() {
            if(http.status == 200 && http.readyState == 4) {
                resolve((http.responseText));
            }
        }
        http.send(formdata);
    })
}