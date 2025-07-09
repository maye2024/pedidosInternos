import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from '../../services/errors.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ''
  password: string = ''
  loading: boolean = false

  constructor(private _userService: UserService,
    private toast: ToastrService,
    private router: Router,
    private _errorService: ErrorsService
  ){}

  login(){
    if (this.email == '' || this.password == '') {
      this.toast.error("Todos los campos son obligatorios", "Error")
      return
    } 

    //crear el objeto
    const user: User = {
      email: this.email,
      password: this.password,
    }

    this.loading = true

    this._userService.logIn(user).subscribe({
          next: (response: {token: string}) => { 
            //console.log(token)
            this.loading = false
            this.toast.success("", "Bienvenido")
            //this.router.navigate(['/dashboard'])

            //Extraer el token del objeto
            const token = response.token;
            
            //Guardar token en localStorage
            localStorage.setItem('token', token);

            //Decodificar token para obtener el rol
            const decodedToken: any = jwtDecode(token);
            const userRole = decodedToken.role;

            //Redirigir según el rol
            if(userRole === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/menu']);
            }
          },
          error: (e: HttpErrorResponse) => {
            this.loading = false
            this._errorService.messageError(e)
          },
        })
  }
}
