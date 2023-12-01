import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '../store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreService } from '../store.service';
import { StoreDialogComponent } from '../store-dialog/store-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [
    MatTableModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule
  ],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent {
  displayedColumns: string[] = ['codMagazin', 'denumire','detalii','action'];
  dataSource!: MatTableDataSource<Store>;
  showImage: boolean = false;
  public storeList = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor (private dialog: MatDialog,
             private storeService: StoreService,
             private renderer:Renderer2){

}
  ngOnInit(): void {
    this.getAllStores();
  }
  
  openDialogStore() {
    this.dialog.open(StoreDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllStores();
      }
    });
  }


  getAllStores(){
    this.storeService.getStores().subscribe({
      next:(res: Store[])=>{
        //map  source
        this.storeList = res.length;
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

  editStore(row: any) { console.log('editing row:',row);
    this.dialog.open(StoreDialogComponent, {
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllStores();
      }
      
    });;
  }

  deleteStore(codMagazin: string){
    this.storeService.deleteStore(codMagazin).subscribe({
      next:(res:any)=>{
        alert('magazinul a fost sters!')
        this.getAllStores();
      }
    })
  }

 
}
