import { Component,ViewChild,ElementRef } from '@angular/core';
import httpReq from 'src/app/httpReq';
import IUser from 'src/interfaces/IUser';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export default class PageComponent {
  @ViewChild("userName")userName!:ElementRef;
  @ViewChild("password")password!:ElementRef;
  @ViewChild("error")error!:ElementRef;
  async login() {
    let res = await httpReq({data:{username:this.userName.nativeElement.value,password:this.password.nativeElement.value},method:"POST",url:"/login",databaseName:"users"});
    let a = document.createElement("a");
    a.href = "/admin";
    if(res == "true") {
      localStorage.setItem("user",this.userName.nativeElement.value);
      a.click();
    }else {
      this.error.nativeElement.innerHTML = "Nombre de usuario / Controseña no existe!";
      setTimeout(()=> {
        this.error.nativeElement.innerHTML = "";
      },2000);
      
    }
  }
}
