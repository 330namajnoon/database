export default function createElement(
    appendChild = document.querySelector("body"),
    data = {
        tagName:"",
        id:"",
        className:"",
        innerHtml:"",
        style:"",
        atrubuts:[
            {
                name:"",
                value:""
            }
        ]
    }
    ) {

        if(data.tagName !== "") {
            const newElement = document.createElement(data.tagName);
            data.id ? newElement.id = data.id : null;
            data.className ? newElement.className = data.className : null;
            data.innerHtml ? newElement.innerHTML = data.innerHtml : null;
           
            data.atrubuts ? data.atrubuts.forEach(e => {
                newElement.setAttribute(e.name,e.value);
            }):null;
            appendChild.appendChild(newElement);
            data.style ? newElement.style.cssText = data.style : null;
            return newElement;
        }else return "error!"

        

}