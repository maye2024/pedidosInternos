import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Animaciones del toast

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './components/dashboard/order/order.component';
import { tokenInterceptor } from './utils/token.interceptor';
import { PuntoComponent } from './components/dashboard/punto/punto.component';
import { InventarioComponent } from './components/dashboard/inventario/inventario.component';
import { MenuComponent } from './components/menu/menu.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ListPedidosComponent } from './components/list-pedidos/list-pedidos.component';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    MaintenanceComponent,
    ErrorPageComponent,
    ProductComponent,
    OrderComponent,
    PuntoComponent,
    InventarioComponent,
    MenuComponent,
    PedidosComponent,
    ListPedidosComponent,
    UpdateOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,//required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })//Toastrmodule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
