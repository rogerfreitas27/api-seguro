export class Cliente{
    id:number;
    nome:string;
    cidade:string;
    uf:string;
    cpf:string;

   
constructor(id:number,nome:string,cidade:string,uf:string,cpf:string){
 this.id=id;
 this.nome=nome;
 this.cidade=cidade;
 this.uf=uf;
 this.cpf=cpf;
    }

}