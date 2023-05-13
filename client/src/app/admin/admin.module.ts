import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import PageComponent  from './page/page.component';
import { DatabaseListComponent } from './database-list/database-list.component';
import { AddDatabaseFormComponent } from './add-database-form/add-database-form.component';



@NgModule({
  declarations: [
    PageComponent,
    DatabaseListComponent,
    AddDatabaseFormComponent
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
