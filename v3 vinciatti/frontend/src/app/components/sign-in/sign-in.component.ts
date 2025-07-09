import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from '../../services/errors.service';
@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  credential: string = '';
  role: string = 'user';

  loading: boolean = false

  constructor( private toast: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorsService
  ){}
  ngOnInit(): void {}

  addUser(){
    if (this.name == '' || this.lastname == '' || this.email == '' || this.password == '' || this.repeatPassword == '' || this.credential == '' || this.role == '') {
      this.toast.error("Todos los campos son obligatorios", "Error")
      return
    } 

    if(this.password != this.repeatPassword){
      this.toast.error("Las claves son diferentes", "warning")
      return
    }

    //crear el objeto

    const user: User = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      credential: this.credential,
      role: this.role as 'admin' | 'user'
    }

    console.log(user);
    this.loading = true

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false
        this.toast.success(`Cuenta de ${this.name} ${this.lastname} creado exitosamente`)
        this.router.navigate(['/logIn'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.messageError(e)
      },
      complete: () => console.info('complete')
    })

    // this._userService.signIn(user).subscribe(data => {
    //   this.loading = false
    //   this.toast.success(`Cuenta de ${this.name} ${this.lastname} creado exitosamente`)
    //   this.router.navigate(['/logIn'])
    // }, (event: HttpErrorResponse) => {
    //   this.loading = false
    //   if(event.error.msg){
    //     console.log(event.error.msg)
    //     this.toast.warning(event.error.msg, 'Error')
    //   } else {
    //     this.toast.error('Existe un error en el servidor', 'Error')
    //   }
        
    // })
  }
}
