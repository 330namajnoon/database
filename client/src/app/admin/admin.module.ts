import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import PageComponent  from './page/page.component';
import { DatabaseListComponent } from './database-list/database-list.component';



@NgModule({
  declarations: [
    PageComponent,
    DatabaseListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PageComponent,
    DatabaseListComponent
  ]
})
export class AdminModule { }
