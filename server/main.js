import SinaSQL from "./sinaSQL-main.js";
const sinaSQL = new SinaSQL();

async function main() {
   
    await sinaSQL.connect("SinaMajnoon","1234");
    
}
main();


