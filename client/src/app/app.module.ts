import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { DatabaseListComponent } from './admin/database-list/database-list.component';
import PageComponentL from './login/page/page.component';
import PageComponentS from './signup/page/page.component';
import PageComponentA from './admin/page/page.component';
@NgModule({
  declarations: [
    AppComponent,
    DatabaseListComponent,
    PageComponentA,
    PageComponentL,
    PageComponentS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
