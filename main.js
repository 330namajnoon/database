import SinaSQL from "./sinaSQL-main.js";

const sinaSQL = new SinaSQL();


async function main() {
   
    console.log(await sinaSQL.signup("SinaMajnoon","sina.majnoonhjk@gmail.com","1234"));
    
}
main();


