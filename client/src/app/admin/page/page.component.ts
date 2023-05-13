import { Component } from '@angular/core';
import { DatabaseListComponent } from '../database-list/database-list.component';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export default class PageComponent {
  userName:string;
  constructor(private appService:AppService) {
    this.userName = appService.getUserName();
  }

}
