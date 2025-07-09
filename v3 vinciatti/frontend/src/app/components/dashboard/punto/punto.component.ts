import { Component } from '@angular/core';
import { PuntoService } from '../../../services/punto.service';
import { Punto } from '../../../interfaces/punto';

@Component({
  selector: 'app-punto',
  standalone: false,
  templateUrl: './punto.component.html',
  styleUrl: './punto.component.css'
})
export class PuntoComponent {

  listPuntos: Punto[] = []
  newPunto: Punto = {
    id: 0,
    name: '',
    direccion: '',
    ciudad: '',
    telefono: ''
  }
  constructor(private _puntoService: PuntoService){}

  ngOnInit(): void {
    this.getPuntos();
  }

  getPuntos(){
    this._puntoService.getPuntos().subscribe(data => {
      console.log('Data:', data); // Verifica qué es lo que se recibe
      if (Array.isArray(data)) {
        this.listPuntos = data;
      } else {
        console.error('Data received is not an array');
      }
    });
  }

  // getPuntos(){
  //   this._puntoService.getPuntos().subscribe(data => {
  //     console.log('data);
  //     this.listPuntos = data
  //   })
  // }

  addPunto() {
    this._puntoService.addPunto(this.newPunto).subscribe(
      response => {
        console.log('Punto added successfully', response);
        //Agrega el nuevo punto a la lista de puntos
        this.listPuntos.push(response);
        this.getPuntos();
        //Resetea el formulario
        this.newPunto = {
          id: 0,
          name: '',
          direccion: '',
          ciudad: '',
          telefono: ''
        };
      },
      error => {
        console.error('Error adding punto', error)
      }
    );
  }
  
  registrarPunto(): void {
    if(this.newPunto.id){
      this._puntoService.updatePunto(this.newPunto.id, this.newPunto).subscribe(
        response => {
          alert('Punto de venta actualizado correctamente');
          this.getPuntos();
        }, error => {
          console.error('Error al actualizar el punto de venta', error);
        }
      );
    } else {
      this.addPunto();
    }
  }

  eliminarPunto(id: number): void {
    this._puntoService.deletePunto(id).subscribe(
      response => {
        alert('Punto de venta eliminado correctamente');
        this.getPuntos();
      },
      error => {
        console.error('Error al eliminar el punto de venta', error);
      }
    );
  }

  editarPunto(item: Punto): void {
    this.newPunto = {...item};
  }
}