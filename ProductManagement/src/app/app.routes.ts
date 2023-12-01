import { Routes } from '@angular/router';
import { StoreListComponent } from './stores/store-list/store-list.component';
import { ProductListComponent } from './products/product-list/product-list.component';

export const routes: Routes = [
    {path: 'stores', component: StoreListComponent },
    {path: 'products', component: ProductListComponent}
];
