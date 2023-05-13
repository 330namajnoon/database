import { Component,ViewChild,ElementRef,AfterViewInit,Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.scss']
})
export class DatabaseListComponent implements AfterViewInit{
  @ViewChild("resize")resize!:ElementRef;
  @ViewChild("container")container!:ElementRef;
  @ViewChild("username")username!:ElementRef;
  userName:string;
  constructor(private appService:AppService) {this.userName = appService.getUserName()}
  t:boolean = false;
  ngAfterViewInit(): void {
      this.username.nativeElement.innerHTML = this.userName;
      this.resize.nativeElement.addEventListener("mousedown",()=> {
        this.t = true;
      })
      this.resize.nativeElement.addEventListener("mouseup",()=> {
        this.t = false;
      })
      window.addEventListener("mousemove",(e)=> {
        if(this.t) {
          let container = this.container.nativeElement;
          container.style.width = (e.clientX+4)+"px";
        }
      })

  }

  createNewDatabase() {
    alert("hola")
  }
}
