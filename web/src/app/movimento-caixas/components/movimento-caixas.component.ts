import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MovimentoCaixasService } from '../services/movimento-caixas.service';
import { FormsModule } from '@angular/forms';
import * as jQuery from 'jquery';
import {AppMessageService} from "../../app-message.service";

@Component({
  templateUrl: 'movimento-caixas.component.html'
})
export class MovimentoCaixasComponent implements OnInit {

  constructor(private httpService: MovimentoCaixasService, private router: Router,
              private toasterService: AppMessageService) {
      document.onkeydown = ((e) =>{
          if(e.keyCode == 113)
          {
              return this.showModal('#mov');
          }
      });
  }

  cor = false;

  caixas = {
      data:[]
  };
  tamanho = 0;
    pesquisa:any = {
        inicio:null,
        fim:null,
        caixa_id:1,
        user:'todos'
    };
    movimentos = {
        data:[]
    };
    total = 0;
    usuarios = {
        data:[]
    };

  ngOnInit(): void {
      this.showLoading();
      let u = {role:null};
      u = JSON.parse(localStorage.getItem('user') || null);
      if(u == null){
          this.toasterService.message('Sem permissão',
              'Usuário sem acesso, contate o administrador','error');
          this.router.navigate(['/user/login']);
      }

      if(u.role !== 'gerente' && u.role !== 'admin' )
      {
          this.toasterService.message('Sem permissão',
              'Usuário sem acesso, contate o administrador','error');
          this.router.navigate(['/dashboard']);
      }

      this.httpService.setAccessToken();
      this.httpService.builder()
          .list({},'movimento/caixas')
          .then((res) => {
              this.movimentos = res;
              console.log(this.movimentos);
              this.tamanho = res.data.length;
              let i;
              for(i = 0; i < res.data.length; i++)
              {
                  if(res.data[i].tipo_movimento === 'credito') {
                      this.total += res.data[i].valor;
                  }else if(res.data[i].tipo_movimento === 'debito'){
                      this.total -= res.data[i].valor;
                  }
              }
              this.hideLoading();
              this.toasterService.message('Sucesso', 'Dados carregados com sucesso','success');
          });
      this.getCaixas();
      this.getUser();

  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/financeiro/movimento/caixas/edit/'+ id]);
    }

    getCaixas()
    {
        this.httpService.builder()
            .list({},'caixas')
            .then((res) => {
                this.caixas = res;
            });
    }

    getUser()
    {
        this.httpService.builder()
            .list({},'users')
            .then((res) => {
                this.usuarios = res;
            });
    }

    new()
    {
        this.router.navigate(['/financeiro/movimento/caixas/new']);
    }

    pesquisar()
    {
        this.showLoading();
        if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null)
        {
            this.total = 0;
            let options = {
                filters: [
                    {user: this.pesquisa.user},
                    {caixa_id: this.pesquisa.caixa_id},
                    {inicio: this.pesquisa.inicio},
                    {fim: this.pesquisa.fim}
                ]
            };
            this.httpService.builder().list(options, 'movimento/caixas/filters')
                .then((res) => {
                    this.movimentos = res;
                    console.log(this.movimentos);
                    this.tamanho = res.data.length;
                    let i;

                    for(i = 0; i < res.data.length; i++)
                    {
                        if(res.data[i].tipo_movimento === 'credito') {
                            this.total += res.data[i].valor;
                        }else if(res.data[i].tipo_movimento === 'debito'){
                            this.total -= res.data[i].valor;
                        }
                    }
                    this.hideModal('#mov');
                    this.hideLoading();
                    this.toasterService.message('Sucesso', 'Dados carregados com sucesso','success');

                });
        }else  {
            this.toasterService.message('Erro', 'Preencha inicio, fim e status para pesquisar.','error');
            this.hideLoading();
        }
    }

    openReal() {
        this.hideModal('#rel');
        window.open('/#/relatorios/relatorio-movimento-caixa', '_blank');
    }

    gerarRel()
    {
        this.showLoading();
        if(this.pesquisa.inicio != null && this.pesquisa.inicio != '')
        {
            let options = {
                filters: [
                    {user: this.pesquisa.user},
                    {caixa_id: this.pesquisa.caixa_id},
                    {inicio: this.pesquisa.inicio},
                    {fim: this.pesquisa.inicio}
                ]
            };
            this.httpService.builder()
                .list(options,'relatorio/fechamento/caixa')
                .then((res)=>{
                    this.hideLoading();
                    localStorage.setItem('mov_caixa_rel',JSON.stringify(res));
                    localStorage.setItem('filtros_rel',JSON.stringify(options));
                    this.openReal();
                    this.toasterService.message('Sucesso','Relátorio gerado com sucesso','success');
                });
        }else{
            this.showLoading();
        }
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

    showModal(id)
    {
        jQuery(id).show().addClass('show');
    }
    hideModal(id)
    {
        jQuery(id).hide();
    }
}
