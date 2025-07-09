import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  listOrders: Order[] = [];
  searchPunto: string = '';
  // searchFechaPedido: string = '';
  searchEstado: string = '';
  selectedOrder: any = null;

  constructor(private _orderService: OrderService){}

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this._orderService.getOrders().subscribe((data: Order[]) => {
      console.log(data);
      this.listOrders = data;
      },error =>{
      console.log("Error al obtener el inventario:", error)
    })
  }

  openEditModal(order: any){
    this.selectedOrder = {...order};
  }

  closeEditModal(){
    this.selectedOrder = null;
  }

  // filteredOrders(): Order[] {
  //   return this.listOrders.filter(order => {
  //     const matchesPunto = this.searchPunto ? order.Punto?.name.toLowerCase().includes(this.searchPunto.toLowerCase()) : true;
  //     const matchesFechaPedido = this.searchFechaPedido ? this.isSameDate(new Date(order.fechaPedido ?? ''), new Date(this.searchFechaPedido)) : true;
  //     const matchesEstado = this.searchEstado ? order.estado?.toLowerCase().includes(this.searchEstado.toLowerCase()) : true;
  //     return matchesPunto && matchesFechaPedido && matchesEstado;
  //   });
  // }

  filteredOrders(): Order[] {
    return this.listOrders.filter(order => {
      const matchesPunto = this.searchPunto ? order.Punto?.name.toLowerCase().includes(this.searchPunto.toLowerCase()) : true;
      let matchesFechaPedido = true;
  
      // if (order.fechaPedido) {
      //   if (this.searchFechaPedido) {
      //     const date = new Date(order.fechaPedido);
      //     if(!isNaN(date.getTime())){
      //       matchesFechaPedido = this.isSameDate(order.fechaPedido, this.searchFechaPedido)
      //     }
      //   }
      // }
  
      const matchesEstado = this.searchEstado ? order.estado?.toLowerCase().includes(this.searchEstado.toLowerCase()) : true;
      return matchesPunto && matchesFechaPedido && matchesEstado;
    });
  }

  isSameDate(date1: string | Date, date2: string): boolean {
    // Convertir date1 a objeto Date si es una cadena
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = new Date(date2);
  
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return false; // Manejar fechas inválidas
    }
  
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  updateOrder() {
    if (!this.selectedOrder) return;
  
    this._orderService.updateOrder(this.selectedOrder.id, {
      fechaEntrega: this.selectedOrder.fechaEntrega,
      estado: this.selectedOrder.estado
    }).subscribe(response => {
      console.log("Orden actualizada:", response);
      this.getOrders();  // Recargar la lista de órdenes
      this.closeEditModal();
    }, error => {
      console.error("Error al actualizar la orden:", error);
    });
  }
  // isSameDate(date1: Date, date2: Date): boolean {
  //   return date1.toDateString() === date2.toDateString();
  // }
  //   filterOrders() {
  //     this.filteredOrders = this.listOrders.filter(order => {
  //       return (
  //         (!this.searchPunto || order.Punto?.name.toLowerCase().includes(this.searchPunto.toLowerCase())) &&
  //         (!this.searchFechaPedido || (order.fechaPedido && new Date(order.fechaPedido).toISOString().split('T')[0] === this.searchFechaPedido)) &&
  //         (!this.searchEstado || order.estado?.toLowerCase().includes(this.searchEstado.toLowerCase()))
  //       );
  //     });
  // }

}
