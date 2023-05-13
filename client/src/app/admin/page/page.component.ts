import { Component,OnInit } from '@angular/core';
import { DatabaseListComponent } from '../database-list/database-list.component';
import { AppService } from 'src/app/app.service';
import SinaSQL from 'src/sinaSQL-main';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export default class PageComponent implements OnInit {
  userName:string;
  private sinaSQL:SinaSQL = new SinaSQL();
  constructor(private appService:AppService) {
    this.userName = appService.getUserName();
  }

  async ngOnInit()  {
    let res = await this.sinaSQL.signup('SinaMajnoon','sina.majnoonhjk@gmail.com','1234')
    let c = await this.sinaSQL.connect('SinaMajnoon','1234');
    let cd = await this.sinaSQL.createDatabase('products');
    let ct = await this.sinaSQL.createTable('products','username');
    let newData = await this.sinaSQL.uploadData('products','username',{id:1,name:'sina'});
    console.log(ct);
  }

}
