import { Component, OnInit } from '@angular/core';
import { Apolice } from 'src/app/model/apolice';
import { ApoliceService } from 'src/app/service/apolice-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apolice',
  templateUrl: './apolice.component.html',
  styleUrls: ['./apolice.component.css']
})
export class ApoliceComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
   apolices:Apolice []=[];
   mensagem : string ="";
   show: boolean = true;
   spinner: boolean = true;

  constructor(private apoliceService:ApoliceService,private router: Router) { }

  ngOnInit(): void {
    this.carregarApolices();
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



  carregarApolices(){
    this.apoliceService.listar().subscribe( apolices =>{
      this. apolices =  apolices;
      this.dtTrigger.next();
      this.spinner=false;
    },
      (error: any) => {
      
         console.log(error);
        this.mensagem=error.error
        this.dtTrigger.next();
        this.spinner=false;
      });
  
  }

  buscarPorId(apolice:Apolice){

    this.apoliceService.armazenaApoliceLocalStorage(apolice);
   this.router.navigateByUrl('/cadastro-apolice');
  }

  excluir(id:number){
    this.apoliceService.excluir(id).subscribe(apolice=>{
      this.show = false // tirar tabela do DOM
      this.spinner=true;

      setTimeout(() => {
        this.show = true // retorna com tabela para o DOM e os dados atualizados do 

  
        this.carregarApolices();
        this.dtTrigger = new Subject();
        this.spinner=false;
  
  
      }, 50);
      
    },
      (error: any) => {
      
         console.log(error.error);
        this.mensagem=error.error
       
      });
  }

}
