import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
    providedIn: 'root'
  })

  export class ClienteService {
    private readonly API = environment.API+'cliente/';

    httpOptions :Object = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'       
      }),
          responseType: 'text'
    };

    constructor(private http : HttpClient) { }

    cadastro(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.API ,cliente,this.httpOptions)
          .pipe(
            catchError(this.handleError))
    
      }


      buscarPorCpf(cpf: string): Observable<Cliente> {
        return this.http.get<Cliente>(this.API + "buscarPorCpf/"+ cpf)
          .pipe(
            retry(1),
            catchError(this.handleError))
    
      }



      alterar(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(this.API, cliente,this.httpOptions)
          .pipe(
            catchError(this.handleError))
    
      }


      

      buscarPorId(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(this.API + id)
          .pipe(
            retry(1),
            catchError(this.handleError))
    
      }


      listar(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.API)
          .pipe(
            retry(2),
            catchError(this.handleError))
    
      }

      excluir(id: number): Observable<Cliente> {
        return this.http.delete<Cliente>(this.API + id,this.httpOptions)
          .pipe(
             catchError(this.handleError))
    
      }

      armazenaClienteLocalStorage(cliente:Cliente){
        localStorage.setItem('cliente', JSON. stringify(cliente));
      }

      carregarClienteLocalStorage(): Cliente | undefined {
        let c = localStorage.getItem('cliente');
        let cliente;
        if(c !=null && c !=undefined){
          let cli =JSON.parse(c);
           cliente = new Cliente(cli.id,cli.nome,cli.cidade,cli.uf,cli.cpf); 
           return cliente;
        }

        return undefined;
         
        
      }

      removerClienteLocalStorage(){
        localStorage.removeItem('cliente');
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