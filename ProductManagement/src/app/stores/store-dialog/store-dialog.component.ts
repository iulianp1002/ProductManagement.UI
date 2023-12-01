import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StoreService } from '../../stores/store.service';

import { Store } from '../../stores/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-store-dialog',
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
  templateUrl: './store-dialog.component.html',
  styleUrl: './store-dialog.component.scss'
})
export class StoreDialogComponent {
  fileName = '';
  selectedValue = '';
  storeForm!: FormGroup;
  actionBtn: string = 'Salveaza';
  titleAction: string = "Adauga";
  selectedVal: any;
  stores: Store[] = [];

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private storeService: StoreService,

    private dialogRef: MatDialogRef<StoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editStoreData: Store) { }


  ngOnInit(): void {
    this.storeForm = this.formBuilder.group({

      codMagazin: ['', Validators.required],
      denumire: ['', Validators.required],
      detalii: ['']

    })

    this.storeService.getStores().subscribe({
      next: (res: Store[]) => {
        this.stores = res;
      },
      error: (err: any) => {
      }
    })

    if (this.editStoreData) {
      this.actionBtn = 'update';
      this.titleAction = 'update';

      this.storeForm.controls['codMagazin']?.setValue(this.editStoreData.codMagazin);
      this.storeForm.controls['denumire'].setValue(this.editStoreData.denumire);
      this.storeForm.controls['detalii']?.setValue(this.editStoreData.detalii);

    }


  }


  addStore() {
    if (!this.editStoreData) {
      if (this.storeForm.valid) {
        var storeFormated = new Store();

        storeFormated.codMagazin = this.storeForm.value.codMagazin;
        storeFormated.denumire = this.storeForm.value.denumire;
        storeFormated.detalii = this.storeForm.value.detalii;


        this.storeService.createStore(storeFormated).subscribe({
          next: (res: any) => {
            alert("magazinul a fost adaugat cu succes!");
            this.storeForm.reset();
            this.dialogRef.close('save');
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        console.log('not valid form:', this.storeForm)
      }
    } else {
      this.updateStore();
    }
  }

  updateStore() {

    var updateModel = new Store();

    updateModel.codMagazin = this.storeForm.value.codMagazin;
    updateModel.denumire = this.storeForm.value.denumire;
    updateModel.detalii = this.storeForm.value.detalii;


    this.storeService.updateStore(updateModel).subscribe({
      next: (res: any) => {
        alert("magazin actualizat cu succes !");
        this.storeForm.reset();
        this.dialogRef.close('update');
      },
      error: (err: any) => {
      }
    })
  }
}
