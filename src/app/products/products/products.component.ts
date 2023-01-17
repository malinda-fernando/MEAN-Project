import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDataService } from '@core/index';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/products/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material';
@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subcriptions = [];
  displayedColumns = ['imgUrl', 'name', 'price', 'action'];

  @ViewChild(MatSort) sort : MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private productDataService: ProductsDataService) { }

  ngOnInit() {
    this.subcriptions.push(
       this.productDataService.getAllProducts()
       .subscribe((products) => this.onDataLoad(products))
       );
  }
9
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subcriptions.forEach(s => s.unsubscribe());
    9
  }
  onDataLoad(products:Product[])  {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products;
    
  }

}
