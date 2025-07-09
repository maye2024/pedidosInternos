import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { guardGuard } from './utils/guard.guard';
import { OrderComponent } from './components/dashboard/order/order.component';
import { InventarioComponent } from './components/dashboard/inventario/inventario.component';
import { MenuComponent } from './components/menu/menu.component';
import { PuntoComponent } from './components/dashboard/punto/punto.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logIn', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [guardGuard]},
  {path: 'product', component: ProductComponent},
  {path: 'menu', component: MenuComponent, canActivate: [guardGuard]},
  {path: 'orders', component: OrderComponent},
  {path: 'inventario', component: InventarioComponent},
  {path: 'puntos', component: PuntoComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: 'Orden', component: UpdateOrderComponent},
  {path: 'listPedidos', component: ListPedidosComponent},
  {path: 'maintenance', component: MaintenanceComponent},
  {path: 'errorPage', component: ErrorPageComponent},
  {path: '**', redirectTo: '/errorPage', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
