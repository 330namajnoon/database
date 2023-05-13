import { LocalizedString } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  context:any = {};
  userName:any = localStorage.getItem("user");
  constructor() { }
  getUserName():string {
    return this.userName;
  }
  set(name:string,value:any):void {
    this.context[name] = value;
  }
  get(name:string):any {
    return this.context[name];
  }
}
