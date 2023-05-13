import { Component, ViewChild, ElementRef } from '@angular/core';
import httpReq from 'src/app/httpReq';
import IUser from 'src/interfaces/IUser';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export default class PageComponent {
  @ViewChild("userName") userName!: ElementRef;
  @ViewChild("email") email!: ElementRef;
  @ViewChild("password") password!: ElementRef;
  @ViewChild("passwordR") passwordR!: ElementRef;
  @ViewChild("error") error!: ElementRef;

  async signup() {
    let userName = this.userName.nativeElement.value;
    let email = this.email.nativeElement.value;
    let password = this.password.nativeElement.value;
    let passwordR = this.passwordR.nativeElement.value;
    if (userName !== "" && email !== "" && password !== "" && passwordR !== "") {
      if (password == passwordR) {
        let newUser: IUser = {
          email: email,
          password: password,
          username: userName
        }
        let res = await httpReq({ data: newUser, databaseName: "users", method: "POST", url: "/signup" });
        let a = document.createElement("a");
        a.href = "/admin";
        if (res == "ture") {
          this.error.nativeElement.innerHTML = res;
          setTimeout(() => {
            this.error.nativeElement.innerHTML = "";
          }, 2000);
        } else {
          localStorage.setItem("user", userName);
          a.click();
        }
      } else {
        this.error.nativeElement.innerHTML = "Controseña no esta correcta!";
        setTimeout(() => {
          this.error.nativeElement.innerHTML = "";
        }, 2000);
      }
    } else {
      this.error.nativeElement.innerHTML = "Tienes que reyenar todos campos!";
      setTimeout(() => {
        this.error.nativeElement.innerHTML = "";
      }, 2000);
    }
  }
}
