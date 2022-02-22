import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Apolice } from '../model/apolice';
import { Cliente } from '../model/cliente';

@Injectable({
    providedIn: 'root'
  })
  export class ApoliceService {

    httpOptions :Object = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'       
      }),
          responseType: 'text'
    };

    constructor(private http : HttpClient) { }

    private readonly API = environment.API+'apolice/'


    cadastro(apolice: Apolice): Observable<Apolice> {
     
        return this.http.post<Apolice>(this.API ,apolice,this.httpOptions)
          .pipe(
            catchError(this.handleError))
    
      }


     



      alterar(apolice: Apolice): Observable<Apolice> {
        return this.http.put<Apolice>(this.API, apolice,this.httpOptions)
          .pipe(
            catchError(this.handleError))
    
      }


      buscarPorId(id: number): Observable<Apolice> {
        return this.http.get<Apolice>(this.API + id)
          .pipe(
            retry(1),
            catchError(this.handleError))
    
      }


      listar(): Observable<Apolice[]> {
        return this.http.get<Apolice[]>(this.API)
          .pipe(
            retry(2),
            catchError(this.handleError))
    
      }

      excluir(id: number): Observable<Apolice> {
        return this.http.delete<Apolice>(this.API + id)
          .pipe(
             catchError(this.handleError))
    
      }



      armazenaApoliceLocalStorage(apolice:Apolice){
        localStorage.setItem('apolice', JSON. stringify(apolice));
      }

      carregarApoliceLocalStorage(): Apolice | undefined {
        let a = localStorage.getItem('apolice');
        let apolice;
        if(a !=null && a !=undefined){
          let apo =JSON.parse(a);
           apolice = new Apolice(apo.id,apo.numero,apo.inicio,apo.fim,apo.placa,apo.valor,
           apo.cliente); 
           console.log("nome do dono da apolice" + apo.cliente.nome);
           return apolice;
        }

        return undefined;
         
        
      }

      removerApoliceLocalStorage(){
        localStorage.removeItem('apolice');
      }







    handleError(error: HttpErrorResponse) {

        let errorMessage = '';
    
    
        if (error.error instanceof ErrorEvent) {
          // Erro ocorreu no lado do client
          errorMessage = error.error.message;
    
        } else {
          // Erro ocorreu no lado do servidor
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    
    
    
        }
    
    
        console.log(error);
        return throwError(error);
      };


  }