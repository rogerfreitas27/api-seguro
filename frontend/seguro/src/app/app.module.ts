import { NgModule ,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxMaskModule, IConfig } from 'ngx-mask'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { FormclienteComponent } from './cliente/formcliente/formcliente.component';
import { ApoliceComponent } from './apolice/apolice/apolice.component';
import { FormapoliceComponent } from './apolice/formapolice/formapolice.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from './service/cliente-service';
import { ApoliceService } from './service/apolice-service';
import { ValidarCpf } from './validacao/validar-cpf';
import { SpinnerComponent } from './spinner/spinner.component';



registerLocaleData(localePt);
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FormclienteComponent,
    ApoliceComponent,
    FormapoliceComponent,
    MenuComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig)

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    HttpClientModule,
    ClienteService,
    ApoliceService,
    ValidarCpf
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
