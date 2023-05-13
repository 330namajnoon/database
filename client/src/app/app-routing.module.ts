import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import PageComponentL from './login/page/page.component';
import PageComponentS from './signup/page/page.component';
import PageComponentA from './admin/page/page.component';
const routes: Routes = [
  {path:'login',component:PageComponentL},
  {path:'signup',component:PageComponentS},
  {path:'admin',component:PageComponentA},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
