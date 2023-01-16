import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDataService } from '@core/index';
@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<any>;
  constructor(private productDataService: ProductsDataService) { }

  ngOnInit() {
    this.products = this.productDataService.getAllProducts();
  }

}
