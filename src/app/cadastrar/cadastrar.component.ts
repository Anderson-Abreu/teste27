import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

user: User = new User
confirmarSenha: string
tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) { }

  ngOnInit(){ 
    window.scroll(0,0)
  }

  confirmSenha(event:any){
    this.confirmarSenha=event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario=event.target.value
  }

  cadastrar(){

    if(this.user.nome.length<3){
      this.alerta.showAlertDanger('preencha o campo nome com pelo menos 3 caracters')
    }

    if(this.user.usuario.length<3){
      this.alerta.showAlertDanger('preencha o campo usuario com pelo menos 3 caracters')
    }
  
    this.user.tipo = this.tipoUsuario

    if(this.user.senha.length<5){
      this.alerta.showAlertDanger('preencha o campo senha com pelo menos 5 caracters')
    }else if(this.user.senha != this.confirmarSenha){
      this.alerta.showAlertDanger('As senhas estão incorretas!!!')
    }else{
      console.log(this.user.nome)
      this.authService.cadastrar(this.user).subscribe((resp:User)=>{
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso!')

      })
    }
  }
}