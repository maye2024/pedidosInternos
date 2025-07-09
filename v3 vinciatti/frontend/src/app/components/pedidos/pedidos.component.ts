import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { Punto } from '../../interfaces/punto';
import { User } from '../../interfaces/user';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { PuntoService } from '../../services/punto.service';
import { UserService } from '../../services/user.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit{

  products: Product[] = [];
      puntos: Punto[] = [];
      users: User[] = [];
    
      order: Order = {
        id: 0,
        description: '',
        fechaPedido: new Date(),
        fechaEntrega: new Date(),
        productoId: undefined,
        ventaId: undefined,
        estado: 'pendiente',
        usuarioId: undefined,
        cantidad: 0
      };
    
      constructor(private fb: FormBuilder, private orderService: OrderService, 
        private _productService: ProductService, private _puntoService: PuntoService,
        private _userService: UserService){
      }
    
      ngOnInit(): void {
        this.getProducts();
        this.getPuntos();
        this.getUsers();
        this.resetForm();
        this.setFechaPedido();
      }
    
      getProducts(){
        this._productService.getProducts().subscribe(data => {
          console.log(data);
          this.products = data;
        })
      }
    
      getPuntos(){
        this._puntoService.getPuntos().subscribe(data => {
          console.log('Data:', data); // Verifica qué es lo que se recibe
          if (Array.isArray(data)) {
            this.puntos = data;
          } else {
            console.error('Data received is not an array');
          }
        });
      }
    
      getUsers(){
        this._userService.getUsers().subscribe(data => {
          console.log(data);
          this.users = data
        })
      }
    
      setFechaPedido(){
        this.order.fechaPedido = new Date();
      }
    
      createOrder() {
        if(!this.validateOrderDate){
          alert("No se pueden crear órdenes después del jueves a las 1:30 PM.")
          return;
        }
        this.order.fechaEntrega = new Date(this.order.fechaEntrega as unknown as string);
        const orderToSend = {...this.order, fechaPedido: new Date()};
        
        this.orderService.createOrders(this.order).subscribe(
          response => {
            console.log('Orden creada:', response);
            alert('Orden creada con éxito');
            this.resetForm();
          },
          error => {
            console.error('Error al crear la orden:', error);
            alert('Error al crear la orden');
          }
        );
      }
    
      validateOrderDate(): boolean {
        const now = new Date();
        const day = now.getDay(); //0 (Domingo) - 6 (Sábado) Jueves(4)
        const hour = now.getHours();
        const minutes = now.getMinutes();
    
        if(day === 4 && (hour > 13 || (hour === 13 && minutes > 30))){
          return false; //No se pueden crear órdenes después del jueves a la 1:30 PM
        }
        return true;//Se pueden crear órdenes
      }
    
      resetForm(){
        this.order = {
          id: 0,
          description: '',
          fechaPedido: new Date(),
          fechaEntrega: new Date(),
          productoId: undefined,
          ventaId: undefined,
          estado: 'pendiente',
          usuarioId: undefined,
          cantidad: 0
        };
      }

}
