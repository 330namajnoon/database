import SinaSQL from "https://heady-mulberry-respect.glitch.me/sinaSQL-main.js";

const sinaSQL = new SinaSQL();



async function main() {
   
    console.log(sinaSQL);
    console.log(await sinaSQL.connect("Sina","1234"));
    console.log(JSON.parse(await sinaSQL.downloadData("angular","users")));
    
}
main();


