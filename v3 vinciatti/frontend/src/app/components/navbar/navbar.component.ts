import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private _userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ){}

  logout(){
    this._userService.logout().subscribe({
      next: () => {
        this.toastr.success("Cierre de sesión exitoso", "Hasta pronto");
        this.router.navigate(['/logIn']);
      },
      error: () => {
        this.toastr.error("Hubo un problema al cerrar sesión", "Error");
      }
    });
  }
}
