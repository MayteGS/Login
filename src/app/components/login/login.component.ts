import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public token: FormGroup;

  constructor(private _userService:UserService, private router:Router) { }

  ngOnInit() {
    this.enviarToken();
  }

  public enviarToken(){
    this.token = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.pattern( /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      password: new FormControl(null,[Validators.required])
    })
  }

  public recibirToken(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    this._userService.requireLogin(this.token.value).subscribe(
      (data:any)=>{
        localStorage.setItem("token", data.token)
        this.router.navigate(['/principal'])
      
    },error =>{
      Toast.fire({
        icon: 'error',
        title: 'invalid data',
        position: 'center'
      })
      this.token.reset();
    })

    
    
    console.log(this.token.value);
    
  }

}
