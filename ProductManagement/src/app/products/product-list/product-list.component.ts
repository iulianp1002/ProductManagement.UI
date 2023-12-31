import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../product';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductService]
})
export class ProductListComponent {

  displayedColumns: string[] = ['codIdx', 'codIdxAlt', 'codMagazin', 'denumire', 'dataInregistrare', 'cantitate', 'pretUnitar', 'action'];
  dataSource!: MatTableDataSource<Product>;
  showImage: boolean = false;
  public productList = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog,
    private productService: ProductService) {

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialogProduct() {
    this.dialog.open(ProductDialogComponent, {
      width: '25%', height: '75%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProducts();
      }
    });
  }


  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (res: Product[]) => {
        //map  source
        this.productList = res.length;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProducts();
      }

    });;
  }

  deleteProduct(row: any, codIdx: string, codIdxAlt: string) {
    this.productService.deleteProduct(codIdx, codIdxAlt).subscribe({
      next: (res: any) => {
        alert('produsul a fost sters!')
        this.getAllProducts();
      }
    })
  }



}
