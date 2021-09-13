import { TemaService } from './../service/tema.service';
import { Tema } from './../model/Tema';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  key = 'data'
  reverse = true


  constructor(
    private router: Router,
    private temaService: TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    console.log(environment.token)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'adm'){
      this.alerta.showAlertDanger("Você precisa ser adminstrador para acessar essa rota!!!")
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar(){
     this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
       this.tema = resp
       this.alerta.showAlertSuccess('Tema cadastrado com sucesso!')
       this.findAllTemas()
       this.tema = new Tema()
     })
  }

}