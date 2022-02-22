import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Cliente }from 'src/app/model/cliente';
import { Apolice } from 'src/app/model/apolice';
import { ApoliceService } from 'src/app/service/apolice-service';
import { ClienteService } from 'src/app/service/cliente-service'



@Component({
  selector: 'app-formapolice',
  templateUrl: './formapolice.component.html',
  styleUrls: ['./formapolice.component.css']
  
})
export class FormapoliceComponent implements OnInit {
  formApolice!: FormGroup; 
  mensagem_sucesso : string="";
  mensagem_erro : string="";
  title : string="";
  cod!:number;
  apolice!:Apolice;
  resp!:any;
  cliente!:Cliente;
  
  

  constructor(private router: Router,private route: ActivatedRoute,private apoliceService:ApoliceService,
    private clienteService:ClienteService
    ) { }

  ngOnInit(): void {
    
   
    this.verificaUrl();


  }




  verificaUrl(){
    this.carregarFormulario();
    let storage = this.apoliceService.carregarApoliceLocalStorage(); 
   
   
  
    
    
    this.route.params.subscribe(params => {
     
      if (params.id) {
       this.cod = params.id;
       this.title="Editar Apólice";
       this.apoliceService.removerApoliceLocalStorage();
      this.buscarPorId(this.cod);
  
      }
      else
      
        if(storage != null && storage != undefined ){
          let aux = storage;
          this.apoliceService.removerApoliceLocalStorage();
          this.title="Editar Apolice";
         this.setarDadosFormulario(aux);
  
        }
        else
      this.title="Cadastrar Apolice";
     
     
           
      });
  
  
  
  }




  carregarFormulario() {

    
   

    this.formApolice = new FormGroup({    
	
      id: new FormControl('',[]),
     idCliente: new FormControl('',[Validators.required]),
    cpf: new FormControl('',[Validators.required,Validators.minLength(11), Validators.maxLength(11)]),
    numero: new FormControl(''),
      inicio: new FormControl('',[Validators.required]),
     fim: new FormControl('',[Validators.required]),
     placa: new FormControl('',[Validators.required]),
    valor: new FormControl('',[Validators.required])
     
     }); 
     
  }


  


  setarDadosFormulario(apolice:Apolice){
    

    this.formApolice.patchValue({
      id: apolice.id,  
      idCliente: apolice.cliente.id,		
      cpf: apolice.cliente.cpf,    
      numero: apolice.numero,
      inicio :apolice.inicio,
      //inicio: {day: new Date(apolice.inicio).getDate(), month: new Date(apolice.inicio).getMonth()+1, year:new Date(apolice.inicio).getFullYear()},
     // fim: {day: new Date(apolice.fim).getDate(), month: new Date(apolice.fim).getMonth()+1, year:new Date(apolice.fim).getFullYear()},
     fim:apolice.fim,
     placa:apolice.placa,
      valor:apolice.valor.toLocaleString('pt-br', {minimumFractionDigits: 2})   
     
      
      
    });

  }

  buscarPorId(id:number){
    this.apoliceService.buscarPorId(id).subscribe( apolice =>{
      this.apolice =   apolice;
      this.setarDadosFormulario(this.apolice);
      
    },
      (error: any) => {
      
         console.log(error.error);
        this.mensagem_erro=error.error
       
      });
  }



  buscarPorCpf(){
    let cpf = this.formApolice.value.cpf;
    
    this.clienteService.buscarPorCpf(cpf).subscribe( cliente =>{
      this.cliente =   cliente;
      console.log(this.cliente);
      this.formApolice.patchValue({        
        idCliente: this.cliente.id,		
        cpf: this.cliente.cpf
      });
      
    },
      (error: any) => {
        if(error.status==404){
          console.log(error.error);
          this.mensagem_erro="Cliente não encontrado na base de dados, verifique o cpf ";
        }
         
       
      });
  }





  onSubmit() {
    var  id = this.formApolice.value.id;
    
    if(this.formApolice.value.inicio > this.formApolice.value.fim){
      this.mensagem_erro="Datas inválidas, fim da vigência menor que inicio da vigência";
      return;
    }


    if(id=="" || id ==null){
      let apolice = new Apolice(id,this.formApolice.value.numero,this.formApolice.value.inicio,this.formApolice.value.fim,
        this.formApolice.value.placa,this.formApolice.value.valor,
        new Cliente(this.formApolice.value.idCliente,"","","",""));
        this.cadastra(apolice);
      
  
    }else{

    let apo = new Apolice(this.formApolice.value.id,this.formApolice.value.numero,this.formApolice.value.inicio,this.formApolice.value.fim,
      this.formApolice.value.placa,this.formApolice.value.valor,
      new Cliente(this.formApolice.value.idCliente,"","","",""));
      this.alterar(apo);
    }
  }

  cadastra(apolice : Apolice){

    this.apoliceService.cadastro(apolice).subscribe(resp=>{
     this.resp=resp;
      this.mensagem_sucesso=this.resp;
     
      
    },
      (error: any) => {
      
         console.log(error.error);
      
        this.mensagem_erro =error.error;
       
      });
  }
    
  

  alterar(apolice : Apolice){

    this.apoliceService.alterar(apolice).subscribe( resp =>{
      this.resp=resp;
      this.mensagem_sucesso=this.resp;
      
    },
      (error: any) => {
      
         console.log(error.error);
        this.mensagem_erro=error.error;
       
       
      });
    
  }





  get id() { return this.formApolice.get('id')!; }
  get idCliente() { return this.formApolice.get('idCliente')!; }
  get cpf() { return this.formApolice.get('cpf')!; }
  get numero() { return this.formApolice.get('numero')!; }
  get inicio() { return this.formApolice.get('inicio')!; }
  get fim() { return this.formApolice.get('fim')!; }
  get placa() { return this.formApolice.get('placa')!; }
  get valor() { return this.formApolice.get('valor')!; }

}



