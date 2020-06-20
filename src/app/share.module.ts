import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatPaginatorModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule
    
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
