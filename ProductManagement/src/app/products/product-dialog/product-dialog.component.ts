import { Component, ElementRef, OnInit, ViewChild,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { StoreService } from '../../stores/store.service';
import { Observable } from 'rxjs';
import { Store } from '../../stores/store';
import { Product } from '../product';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit{

  selectedValue ='';
  stores :Store[] =  [];
  productForm! : FormGroup;
  actionBtn: string = 'save';
  titleAction: string = "Adauga";
  store = new FormControl(this.stores);
  selectedStores : Store[] = [];



  selectedVal:any;




  constructor (private http: HttpClient, 
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private storeService: StoreService,
    
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editProductData : Product){}


    ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        codIdx: ['',Validators.required],
        codIdxAlt: ['',Validators.required],
        codMagazin:['',Validators.required],
        denumire:['',Validators.required],
        dataInregistrare:[''],
        cantitate:[''],
        pretUnitar:['']
      })
    
      this.storeService.getStores().subscribe({
        next:(res:Store[])=> {
          this.stores = res;
        },
        error:(err:any)=>{
        }
      })
    
      if(this.editProductData){

        
        this.selectedVal = this.editProductData.codMagazin;
        this.actionBtn='update';
        this.titleAction='update';
        this.productForm.controls['codIdx']?.setValue(this.editProductData.codIdx);
        this.productForm.controls['codIdxAlt']?.setValue(this.editProductData.codIdxAlt);
        this.productForm.controls['codMagazin']?.setValue(this.editProductData.codMagazin);
        this.productForm.controls['denumire'].setValue(this.editProductData.denumire);
        this.productForm.controls['dataInregistrare']?.setValue(this.editProductData.dataInregistrare);
        this.productForm.controls['cantitate']?.setValue(this.editProductData.cantitate);
        this.productForm.controls['pretUnitar']?.setValue(this.editProductData.pretUnitar);
      }

      
    }

    getValues(event: {
      isUserInput: any;
      source: { value: any; selected: any;  };}) 
      {
    
        if (event.isUserInput) {
          if (event.source.selected === true) {
            this.selectedStores.push(event.source.value)
          } else {
            //console.log(event.source.value)
          }
        }
      }
    
    getProductIdList(productList:Store[]):number[]{
      let arrId : number[] = [];
      
      for ( var i = 0; i < productList.length; i++ ) {
          
          arrId.push(parseInt((productList[i]).toString()));
        
      } 
      
      return arrId;
    }
    
    
     addProduct(){
      if(!this.editProductData){ 
        if(this.productForm.valid){
        var productFormated = new Product();
        productFormated.codIdx = this.productForm.value.codIdx;
        productFormated.codIdxAlt = this.productForm.value.codIdxAlt;
        productFormated.codMagazin = this.productForm.value.codMagazin;
        productFormated.denumire = this.productForm.value.denumire;
        productFormated.dataInregistrare = this.productForm.value.dataInregistrare;
        productFormated.cantitate = this.productForm.value.cantitate;
        productFormated.pretUnitar = this.productForm.value.pretUnitar;

          this.productService.createProduct(productFormated).subscribe({
            next:(res)=> {
              alert("produsul a fost adaugat cu succes!");
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error:(err:any)=>{
                console.log(err);
            }
          })
        }else{
          console.log('not valid form:',this.productForm)
        }
      }else{ 
        this.updateProduct();
      }
     }
    
     updateProduct(){ 
      
      var updateModel = new Product();
          updateModel.codIdx = this.productForm.value.codIdx;
          updateModel.codIdxAlt = this.productForm.value.codIdxAlt;
          updateModel.codMagazin = this.productForm.value.codMagazin;
          updateModel.denumire = this.productForm.value.denumire;
          updateModel.dataInregistrare = this.productForm.value.dataInregistrare;
          updateModel.cantitate = this.productForm.value.cantitate;
          updateModel.pretUnitar = this.productForm.value.pretUnitar;
    
      this.productService.updateProduct(updateModel).subscribe({
        next:(res)=> {
          alert("produs actualizat cu succes !");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:(err:any)=>{
        }
      })
     }
}
