import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/product.service';
import { Product } from './products/product';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule,MatIconModule, MatSidenavModule, MatListModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ProductManagement';
  isExpanded = true;
  events: string[] = [];
  opened: boolean = true;

  @ViewChild(ProductListComponent) productList: any;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  totalStores = 5;
  totalProducts = 300;

  constructor (
    private productService: ProductService){

}

   public ngOnInit(): void {
    this.getAllProducts();
    this.totalProducts = this.productList;


    this.productService.ProductsStateEvent.pipe(first()).subscribe((res:Product[]) => {
      this.totalProducts = res.length;
  });
    
  }

  getAllProducts(){
    this.productService.getProducts().subscribe({
      next:(res: Product[])=>{
        //map  source
        this.productList = res.length;
        
      },
      
    })
  }
}
