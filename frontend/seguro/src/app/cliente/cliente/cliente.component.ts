import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
   clientes:Cliente []=[];
   mensagem_erro : string ="";
   spinner: boolean = true;
   resp!:any;
   show: boolean = true;

  constructor(private clienteService:ClienteService,private router: Router) { }

  ngOnInit(): void {
    this.carregarClientes();
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        processing: "Procesando...",
        search: "Pesquisar:",
        lengthMenu: "Exibir _MENU_ registros",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        loadingRecords: "Carregando...",
        zeroRecords: "Nenhum registro encontrado",
        emptyTable: "Nenhum registro encontrado",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente"
        }
    }
  }
  }


  carregarClientes(){
    this.clienteService.listar().subscribe( clientes =>{
      this. clientes =  clientes;
      this.dtTrigger.next();
      this.spinner=false;
    },
      (error: any) => {
      
         console.log(error);
        this.mensagem_erro=error.error
        this.dtTrigger.next();
        this.spinner=false;
      });
  
  }


  buscarPorId(cliente:Cliente){
    
    this.clienteService.armazenaClienteLocalStorage(cliente);
    this.router.navigateByUrl('/cadastro-cliente');
  }



  excluir(id:number){
    this.clienteService.excluir(id).subscribe(resp=>{
      this.show = false // tirar tabela do DOM
      this.spinner=true;
      this.resp=resp;

      setTimeout(() => {
        this.show = true // retorna com tabela para o DOM e os dados atualizados do 

  
        this.carregarClientes();
        this.dtTrigger = new Subject();
        this.spinner=false;
  
  
      }, 50);
      
    },
      (error: any) => {
      
         console.log(error.error);
        this.mensagem_erro=error.error
       
      });
  }





}
