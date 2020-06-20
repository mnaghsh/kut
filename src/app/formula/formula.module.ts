import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulaRoutingModule } from './formula-routing.module';
import { MatCardModule } from '@angular/material';
import { SharedModule } from '../share.module';
import { CalculatedFormulaComponent } from './calculatedFormula/calculatedFormula.component';
import { CommonFormulaComponent } from './commonFormula/commonFormula.component';
import { IndexComponent } from './index/index.component';
import { AddUnCalculatedFormulDependantToCourseComponent } from './commonFormula/addUnCalculatedFormulDependantToCourse.component';
import { AddCalculatedFormulDependantToCourseComponent } from './calculatedFormula/addCalculatedFormulDependantToCourse.component';
import { TotalCalculatedFormulaComponent } from './totalFormula/calculatedFormula/toalCalculatedFormula.component';
import { TotalUnCalculatedFormulaComponent } from './totalFormula/unCalculatedFormula/totalUnCalculatedFormula.component';
import { AddTotalCalculatedFormulComponent } from './totalFormula/calculatedFormula/addTotalCalculatedFormul.component';
import { AddTotalUnCalculatedFormulComponent } from './totalFormula/unCalculatedFormula/addTotalUnCalculatedFormul.component';

@NgModule({
  imports: [
    CommonModule,
    FormulaRoutingModule,
    SharedModule,
    
  ],
  entryComponents: [TotalCalculatedFormulaComponent,TotalUnCalculatedFormulaComponent,CommonFormulaComponent,CalculatedFormulaComponent],
  declarations: [TotalCalculatedFormulaComponent,TotalUnCalculatedFormulaComponent,AddTotalCalculatedFormulComponent,AddTotalUnCalculatedFormulComponent, IndexComponent,AddCalculatedFormulDependantToCourseComponent,AddUnCalculatedFormulDependantToCourseComponent ,CommonFormulaComponent,CalculatedFormulaComponent]
})
export class FormulaModule { }
