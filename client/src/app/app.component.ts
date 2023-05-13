import { Component , AfterViewInit,ViewChild,ElementRef} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild("admin")admin!:ElementRef;
  @ViewChild("login")login!:ElementRef;
  ngAfterViewInit(): void {
    let user = localStorage.getItem("user");
    if(location.pathname == "/") {
      if(user) {
        this.admin.nativeElement.click();
      }else {
        this.login.nativeElement.click();
      }
    }
  }
}
