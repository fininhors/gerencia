import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute,private toasterService: ToasterService) {
        document.onkeydown = ((e) =>{
            if(e.keyCode  == 120)
            {
                this.save();
            }

            if(e.keyCode == 27)
            {
                this.cancel();
            }
        });
    }


    cart =  this.httpService.get();
    order = {};
    client = {
        id:1,
        name:null,
        phone:null,
        address:{
            address:null,
            numero:null,
            bairro:null,
            city_id:0
        },
        email:null
    };
    items = [];
    result = {};
    qtd = 1;
    total = 0;
    pesquisa = {
        value:null,
        value2:null
    };
    mesas: {};
    mesa_id = null;
    tipo = 0;
    novo = true;
    cartao = false;
    troco = 0;
    bandeira = '';

    ngOnInit(): void {
        if(!this.cart)
        {
            this.httpService.initCart();
        }
        this.items = this.httpService.get();
        this.total = this.httpService.get().total;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'mesas/livres')
            .then((res) => {
                this.mesas = res.data;

            });

        this.showLoading();
        jQuery('#new_order').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300);
    }

    buscarCliente()
    {
        if(this.pesquisa.value2 == null)
        {
            this.toasterService.pop('error','campo cliente vazio')
        }else{
            this.httpService.builder('search/client')
                .search(this.pesquisa.value2)
                .then((res) => {
                    if(res.data.length == 0){
                        this.client.id = 1;
                        this.client.name = null;
                        this.client.phone = null;
                        this.client.email = null;
                        this.client.address.address = null;
                        this.client.address.numero = null;
                        this.client.address.bairro = null;
                        this.client.address.city_id = 0;
                        this.novo = true;
                        this.toasterService.pop('info', 'Nenhum cliente encontrado, cadastre o cliente');
                    }else {
                        this.client.id = res.data[0].id;
                        this.client.name = res.data[0].name;
                        this.client.phone = res.data[0].phone;
                        this.client.email = res.data[0].user.data.email;
                        this.client.address.address = res.data[0].addressClient.data.address;
                        this.client.address.numero = res.data[0].addressClient.data.numero;
                        this.client.address.bairro = res.data[0].addressClient.data.bairro;
                        this.client.address.city_id = res.data[0].addressClient.data.city.data.id;
                        this.novo = false;
                    }
                });
        }
    }

    buscar()
    {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('search')
            .search(this.pesquisa.value)
            .then((res) => {
                this.httpService.eventEmitter.emit();
                this.pesquisa.value = null;
                this.result = res.data;
                this.hideLoading();
                if(res.data.length>1){
                    jQuery('#pesquisa').show().addClass('show');
                }else{
                    if(res.data.length===1)
                    {
                        this.addItem(this.result[0]);
                        this.total = this.httpService.get().total;
                        this.items = this.httpService.get();
                        this.qtd = 1;
                    }
                }
            });
    }

    addItem(item)
    {
        item.qtd = this.qtd;
        this.httpService.addItem(item);
        this.toasterService.pop('success', 'Sucesso', 'Item codigo '+item.id+' adicionado.');
    }

    removeItem(i)
    {
        this.httpService.removeItem(i);

        this.total = this.httpService.get().total;
        this.items = this.httpService.get();

        this.toasterService.pop('info', 'Informação', 'Item removido.');
    }

    save()
    {
        let card = '';
        let bandeira = '';
        if(this.tipo != 1){
            this.mesa_id = 1;
        }

        if(this.tipo != 1 && this.client.id == 1)
        {
            this.toasterService.pop('error', 'É necessário cadastrar um cliente ou selecionar');
        }else {
            if (this.mesa_id != null) {
                if(this.cartao == false)
                {
                    card = 'Não';
                }else{
                    card = 'Sim';
                    bandeira = 'Bandeira do cartão:' + this.bandeira;
                }
                console.log('mesa', this.mesa_id);
                this.showLoading();
                this.httpService.setAccessToken();
                if (this.httpService.get().items.length > 0) {
                    let pedido = {
                        items: this.httpService.get().items,
                        total: this.httpService.get().total,
                        mesa_id: this.mesa_id,
                        client_id: this.client.id,
                        type: this.tipo,
                        cartao: card,
                        troco: 'Troco para: '+this.troco+',00 reais',
                        observacao: bandeira
                    };
                    this.httpService.builder()
                        .insert(pedido, 'order')
                        .then((res) => {
                            this.httpService.clear();
                            this.httpService.eventEmitter.emit();
                            this.hideLoading();
                            this.toasterService.pop('success', 'Sucesso', 'Pedido ' + res.data.id + ' salvo com sucesso');
                            this.close(res.data.id);
                        });
                } else {
                    this.hideLoading();
                    this.toasterService.pop('error', 'Erro', 'É necessário adicionar ao menos um produto');
                }
            } else {
                this.toasterService.pop('error', 'Erro', 'É necessário escolher uma mesa');
            }
        }
    }

    saveClient()
    {
        if(this.client.name == null || this.client.phone == null)
        {
            this.toasterService.pop('error', 'Campos do cadastro vazio, verifique');
        }else if(this.client.address.address == null || this.client.address.bairro == null || this.client.address.numero == null)
        {
            this.toasterService.pop('error', 'Campos do endereço vazio, verifique');
        }else if(this.client.address.city_id == 0)
        {
            this.toasterService.pop('error', 'Selecione uma cidade');
        }else{
            this.client.id = null;
            this.httpService.builder()
                .insert(this.client,'client')
                .then((res) =>{
                    console.log(res);
                    this.client.id = res.data.id;
                    this.client.name = res.data.name;
                    this.client.phone = res.data.phone;
                    this.client.email = res.data.email;
                    this.client.address.address = res.data.addressClient.data.address;
                    this.client.address.numero = res.data.addressClient.data.numero;
                    this.client.address.bairro = res.data.addressClient.data.bairro;
                    this.client.address.city_id = res.data.addressClient.data.city.data.id;
                    console.log('cliente', this.client);
                    this.toasterService.pop('success','Cliente '+ this.client.name+' cadastrado com sucesso, codigo:' + this.client.id);
                })
        }
    }

    close(id: number)
    {
        jQuery('#new_order').hide();
        this.router.navigate(['/orders/printer/'+id]);
    }

    cancel()
    {
        jQuery('#new_order').hide();
        this.router.navigate(['/orders']);
    }

    closeMd()
    {
        jQuery('#pesquisa').hide();
    }


    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}

