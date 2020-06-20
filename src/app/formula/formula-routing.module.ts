
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatedFormulaComponent } from './calculatedFormula/calculatedFormula.component';
import { IndexComponent } from 'src/app/formula/index/index.component';
import { CommonFormulaComponent } from './commonFormula/commonFormula.component';
import { AddUnCalculatedFormulDependantToCourseComponent } from './commonFormula/addUnCalculatedFormulDependantToCourse.component';
import { AddCalculatedFormulDependantToCourseComponent } from './calculatedFormula/addCalculatedFormulDependantToCourse.component';
import { AddTotalUnCalculatedFormulComponent } from './totalFormula/unCalculatedFormula/addTotalUnCalculatedFormul.component';
import { AddTotalCalculatedFormulComponent } from './totalFormula/calculatedFormula/addTotalCalculatedFormul.component';


const routes: Routes = [{
  path: '',
  component: IndexComponent,
  children: [
    {
      path: 'commonFormula',
      component: AddUnCalculatedFormulDependantToCourseComponent
    },
    {
      path: 'calculatedFormula',
      component: AddCalculatedFormulDependantToCourseComponent
    },
    {
      path: 'totalCommonFormula',
      component: AddTotalUnCalculatedFormulComponent
    },
    {
      path: 'totalCalculatedFormula',
      component: AddTotalCalculatedFormulComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaRoutingModule { }
