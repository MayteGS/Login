import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient) { }

  public requireLogin(user){
    let URL:string= 'https://reqres.in/api/login';

    return this.http.post(URL,user)
    console.log(user);
  }

  
  
}
