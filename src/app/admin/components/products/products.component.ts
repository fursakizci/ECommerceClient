import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner)
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Pacman);
    
    this.httpClientService.get({
      controller:"product"
    }).subscribe(data => console.log(data));
   
    // this.httpClientService.post({
    //   controller:"products"},
    //   {
    //     name:"deneme111",
    //     stock: 11, 
    //     price: 5
    //   }).subscribe();

    // this.httpClientService.put({
    //   controller:"products"},{
    //     id:"x",
    //     name: "renkli kagit",
    //     stock : 123,
    //     price : 7
    //   })
  }

}
