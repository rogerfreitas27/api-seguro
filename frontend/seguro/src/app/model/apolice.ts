import { Cliente } from "./cliente";


export class Apolice{
    id:number;
    numero:string;
    inicio:Date;
    fim:Date;
    placa:string;
    valor:number;
    cliente:Cliente;

   

constructor(id:number,numero:string,inicio:Date,fim:Date,placa:string,valor:number,cliente:Cliente){
this.id=id;
this.numero=numero;
this.inicio=inicio;
this.fim=fim;
this.placa=placa;
this.valor=valor;
this.cliente=cliente;
    }
}