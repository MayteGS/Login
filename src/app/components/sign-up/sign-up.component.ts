import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public formulario: FormGroup;
  private regex: RegExp = /^[a-zA-Z\s]*$/

  constructor(private router:Router) { }

  ngOnInit() {
    this.crearFormulario();
  }

  public crearFormulario(){
    this.formulario = new FormGroup({
      name: new FormControl(null, [Validators.minLength(5), Validators.required, this.No_Numeros.bind(this)]),
      lastname: new FormControl(null, [Validators.minLength(5), Validators.required, this.No_Numeros.bind(this)]),
      email: new FormControl(null,[Validators.required,Validators.pattern( /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      pass: new FormControl(null, [Validators.minLength(8), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      pass2: new FormControl(null)
    }) 

  }

  private No_Numeros(control: FormControl): { [key: string]: boolean } {
    if (control.value == null) return null;
    if (!this.regex.test(control.value)) return { ExisteNumero: true };
    return null;
  }

  public registroTerminado(){
    console.log(this.formulario);

    Swal.fire({
      text: "Your registration has been completed",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['login'])
      }
    })
  }
}
