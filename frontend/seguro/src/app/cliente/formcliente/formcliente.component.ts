import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente-service';
import { Cliente } from 'src/app/model/cliente';
import { ValidarCpf } from 'src/app/validacao/validar-cpf';

@Component({
  selector: 'app-formcliente',
  templateUrl: './formcliente.component.html',
  styleUrls: ['./formcliente.component.css']
})
export class FormclienteComponent implements OnInit {
  formCliente!: FormGroup; 
  mensagem_sucesso : string="";
  mensagem : string="";
  mensagem_erro : string="";
  title : string="";
  id!:number;
  cliente!:Cliente;
  resp!:any;

  constructor(private router: Router,private route: ActivatedRoute,private clienteService:ClienteService,
    private validarCpf:ValidarCpf) { }

  ngOnInit(): void {
this.verificaUrl();
  }


 verificaUrl(){

  let storage = this.clienteService.carregarClienteLocalStorage();  

  this.carregarFormCliente();
  
  this.route.params.subscribe(params => {
   
    if (params.id) {
     this.id = params.id;
     this.title="Editar Cliente";
     this.clienteService.removerClienteLocalStorage();
    this.buscarPorId(this.id);

    }
    else
    {
      if(storage != null && storage != undefined){
        let aux = storage;
        this.clienteService.removerClienteLocalStorage();
        this.title="Editar Cliente";
       this.setarDadosFormulario(aux);

      }
      else
    this.title="Cadastrar Cliente";
   
   
         }
    });



}



  carregarFormCliente() {

    this.formCliente = new FormGroup({
    
	
	   id: new FormControl('',[]),
     nome: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(255)]),
     cpf: new FormControl('',[Validators.required,Validators.minLength(11), Validators.maxLength(11)]),
     uf: new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(2)]),
     cidade: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(60)]),
     }); 
  }

  setarDadosFormulario(cliente:Cliente){

    this.formCliente.patchValue({
      id: cliente.id,  
      nome: cliente.nome,		
      cpf: cliente.cpf,    
      uf: cliente.uf,
      cidade: cliente.cidade   
     
      
      
    });

  }

  buscarPorId(id:number){
    this.clienteService.buscarPorId(id).subscribe( cliente =>{
      this.cliente =   cliente;
      this.setarDadosFormulario(this.cliente);
      
    },
      (error: any) => {
      
         console.log(error.error);
        this.mensagem_erro=error.error
       
      });
  }

  verificaCpf(){
    let resposta  = this.validarCpf.cpf(this.formCliente.value.cpf);
    
    if(resposta==false){
      this.mensagem_erro="Cpf inválido";
    }else
alert("cpf valido");
  }



  onSubmit() {
    this.clienteService.cadastro(this.formCliente.value).subscribe(
      resp=>{   
        this.resp=resp;  
      this.mensagem_sucesso=this.resp;    
             },
      (error: any) => {
      
         console.log(error.error);
      
        this.mensagem =error.error;
       
      });
  }



  get nome() { return this.formCliente.get('nome')!; }
  get cpf() { return this.formCliente.get('cpf')!; }
  get uf() { return this.formCliente.get('uf')!; }
  get cidade() { return this.formCliente.get('cidade')!; }

}
