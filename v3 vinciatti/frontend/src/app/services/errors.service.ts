import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private toastr: ToastrService) { }

  messageError(e: HttpErrorResponse){
    if(e.error.msg){
      console.log(e.error.msg)
      this.toastr.warning(e.error.msg, 'Error')
    } else {
      this.toastr.error('Existe un error en el servidor', 'Error')
    }
  }
}
