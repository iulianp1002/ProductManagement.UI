import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductService } from './products/product.service';
import { Product } from './products/product';
import { Subscription, first } from 'rxjs';
import { Store } from './stores/store';
import { StoreListComponent } from './stores/store-list/store-list.component';
import { StoreService } from './stores/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ProductManagement';
  isExpanded = true;
  events: string[] = [];
  opened: boolean = true;
  data: any;
  dataSubscription: Subscription | undefined;

   @ViewChild(ProductListComponent) productList: any;
   @ViewChild(StoreListComponent) storeList: any;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  totalStores = 0;
  totalProducts = 0;
  products: Product[] = [];

  constructor(
    private productService: ProductService, private storeService: StoreService) {

  }

  public ngOnInit(): void {

    this.getAllStores();
    this.getAllProducts();

 
    this.storeService.myBehaviorSubject.subscribe(value => {
      this.totalStores = value;
    });

    this.productService.myProductBehaviorSubject.subscribe(data => {
      this.totalProducts = data;

    });

  }

  getAllProducts() {
    this.productService.getProducts()
    .subscribe({
      next: (res: Product[]) => {
        this.productList = res.length;
        
      },
    })
  }

  getAllStores() {
    this.storeService.getStores().subscribe({
      next: (res: Store[]) => {
        this.storeList = res.length;
      },
    })
  }
}
