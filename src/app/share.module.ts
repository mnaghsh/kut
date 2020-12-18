import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatDividerModule, MatSortModule, MatTooltipModule, MatStepperModule, MatSpinner, MatProgressSpinnerModule, MatProgressBarModule, MatExpansionModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { TextFieldModule } from '@angular/cdk/text-field';



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
    MatDividerModule,
    MatSortModule,
    MatTooltipModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    TextFieldModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
