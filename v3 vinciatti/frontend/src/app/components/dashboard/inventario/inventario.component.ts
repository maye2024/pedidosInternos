import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../../interfaces/inventario';
import { InventarioService } from '../../../services/inventario.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit{
  listaProductos: Product[] = [];//lista de productos disponibles
  nuevoInventario: Inventario = {
      description: '',
      productoId: 0,
      entrada: 0,
      salida: 0,
      saldo: 0
  };
  listInventario: Inventario[] = [];
  errorMessage: string = '';

  constructor(private inventarioService: InventarioService, private productService: ProductService){}

  ngOnInit(): void {
    this.getInventario();
    this.getProducts();
  }

  getInventario(){
    this.inventarioService.getInventario().subscribe((data: Inventario[]) => {
      console.log(data);
      this.listInventario = data;
      },error =>{
      console.log("Error al obtener el inventario:", error)
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe((productos: Product[])=> {
      this.listaProductos = productos;
    }, error => {
      console.log("Error al obtener productos:", error)
    });
  }

  // guardarInventario(){
  //   if(this.esEdicion){

  //   }
  //   this.nuevoInventario.saldo = this.nuevoInventario.entrada - this.nuevoInventario.salida; //calcula el saldo
  //   this.inventarioService.registrarInventario(this.nuevoInventario).subscribe(response => {
  //     console.log("Inventario registrado:", response);
  //     this.getInventario(); //Resfrescar la lista
  //     this.resetNuevoInventario();
  //   }, error => {
  //     console.log("Error al registrar inventario:", error)
  //   })
  // }

  registrarInventario() {
    // Verificar si el producto ya existe en el inventario y no es una edición
    this.errorMessage = '';
    const productoExistente = this.listInventario.some(item => item.productoId === this.nuevoInventario.productoId);

    if (productoExistente && !this.nuevoInventario.id) { 
        alert("Este producto ya está registrado en el inventario. Puedes editarlo en su lugar.");
        return;
    }

    if (this.nuevoInventario.id) {
        // Actualizar inventario existente
        this.inventarioService.updateInventario(this.nuevoInventario.id, this.nuevoInventario)
            .subscribe(response => { 
                alert('Inventario actualizado correctamente'); 
                this.getInventario(); 
                this.resetNuevoInventario();
            }, error => { 
                console.error('Error al actualizar el inventario:', error); 
                alert('Error interno del servidor'); 
            });
    } else {
        // Lógica para crear nuevo inventario
        this.nuevoInventario.saldo = (this.nuevoInventario.entrada ?? 0) - (this.nuevoInventario.salida ?? 0);
        this.inventarioService.registrarInventario(this.nuevoInventario).subscribe({
          next: (response) => { 
            console.log("Inventario registrado:", response); 
            alert('Inventario registrado'); 
            this.getInventario(); 
            this.resetNuevoInventario();
        }, error: (error: HttpErrorResponse) => { 
            console.error("Error al registrar inventario:", error);
            this.errorMessage = error.status === 400 ? error.error.message || 'Error en la solicitud' : 'Error interno del servidor';
        }
    });
    }
  }

  resetNuevoInventario(){
    this.nuevoInventario = { //Resetear formulario
      id: 0,
      description: '',
      productoId: 0,
      entrada: 0,
      salida: 0,
      saldo: 0
    };
  }

  updateSaldo() {
    this.nuevoInventario.saldo = (this.nuevoInventario.entrada ?? 0) - (this.nuevoInventario.salida ?? 0)
    
  }

  haySaldoNegativo(): boolean {
    return this.listInventario.some(item => item.saldo !== undefined && item.saldo < 0);
  }
  
  editarInventario(item: Inventario): void {
    this.nuevoInventario = { ...item };
  }

  productoYaRegistrado(): boolean{
    return this.listInventario.some(item => item.productoId === this.nuevoInventario.productoId) && !this.nuevoInventario.id;
  }

  limpiarError() {
    this.errorMessage = '';
  }
}
