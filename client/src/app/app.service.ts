import { LocalizedString } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userName:any = localStorage.getItem("user");
  constructor() { }
  getUserName():string {
    return this.userName;
  }
}
