import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  listProducts: Product[] = []
  listproduct: Product = {
    id: 0,
    name: '',
    description: ''
  };
  constructor(private _productService: ProductService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this._productService.getProducts().subscribe(data => {
      console.log(data);
      if(Array.isArray(data)){
        this.listProducts = data
      } else {
      console.error('Data is not an array', data);
    }
    });
  }

  // addProducto() {
  //   this._productService.addProduct(this.listproduct).subscribe(
  //     response => {
  //       console.log('Punto added successfully', response);
  //       //Agrega el nuevo punto a la lista de puntos
  //       this.listProducts.push(response);
  //       this.getProducts();
  //       //Resetea el formulario
  //       this.listproduct = {
  //         id: 0,
  //         name: '',
  //         description: ''
  //       };
  //     },
  //     error => {
  //       console.error('Error adding producto', error)
  //     }
  //   );
  // }

  registrarProducto(): void {
    if(this.listproduct.id) {
      this._productService.updateProduct(this.listproduct.id, this.listproduct).subscribe(
        response => {
          alert('Producto actualizado correctamente');
          this.getProducts();
        }, error => {
          console.error('Error al actualizar el producto', error);
          alert('Error interno del servidor');
        }
      );
    } else {
      this._productService.addProduct(this.listproduct).subscribe(
        response => {
          console.log('Punto added successfully', response);
          //Agrega el nuevo punto a la lista de puntos
          this.listProducts.push(response);
          this.getProducts();
          //Resetea el formulario
          this.listproduct = {
            id: 0,
            name: '',
            description: ''
          };
        },
        error => {
          console.error('Error adding producto', error)
        }
      );
    }
  }

  editarProduct(item: Product): void {
    this.listproduct = {...item};
  }

  eliminarProduct(id: number): void {
    this._productService.deleteProduct(id).subscribe(
      response => {
        alert('Producto eliminado correctamente');
        this.getProducts();
      },
      error => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }
}
