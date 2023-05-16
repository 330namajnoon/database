import createElement from "./createElement.js";
import SinaSQL from "https://heady-mulberry-respect.glitch.me/sinaSQL-main.js";
const sinaSQL = new SinaSQL();
function Option(container = document.body,data = {id:1,data:{name:"",lastName:""}}) {
    this.id = data.id;
    this.data = data.data;
    this.container = createElement(container,{tagName:"div",className:"option_container"});
    this.name = createElement(this.container,{tagName:"h1",innerHtml:this.data.name});
    this.lastName = createElement(this.container,{tagName:"h1",innerHtml:this.data.lastName});

}
export default function List() {
    this.data = [];
    this.container = createElement(document.body,{tagName:"div",className:"container"});
    this.options = [];
}
List.prototype.downloadData = async function() {
    await sinaSQL.connect("Sina","1234");
    this.data = JSON.parse(await sinaSQL.downloadData("angular","users"));
}
List.prototype.uploadData = async function() {
    await sinaSQL.connect("Sina","1234");
    this.data = JSON.parse(await sinaSQL.downloadData("angular","users"));
    this.data = JSON.parse(await sinaSQL.downloadData("angular","users"));
}
List.prototype.draw = function() {

}