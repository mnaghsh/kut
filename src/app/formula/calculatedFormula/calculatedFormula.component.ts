import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CalculatedDependantToCourseService } from 'src/app/services/CalculatedDependantToCourse/calculated-dependant-to-course.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef } from '@angular/material';
export interface User {
  name: string;
  operand: any;
}
export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-calculatedFormula',
  templateUrl: './calculatedFormula.component.html',
  styleUrls: ['./calculatedFormula.component.scss']
})
export class CalculatedFormulaComponent implements OnInit {
  activeItems = [{
    label: ""
  }];
  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [
    {
      letter: 'سایر',
      names: ['(', ')',',']
    },

    {
      letter: 'عملگرها',
      names: ['+', '-', '*', 'dbo.divider', '%']
    },
    {
      letter: 'عملگرهای منطقی',
      names: ['and', 'or']
    },
    {
      letter: 'مقایسه گرها',
      names: ['<', '>', '<=', '>=', '=', '<>']
    }, {
      letter: 'شرط ها',
      names: ['case' ,'when', 'then', 'else', 'end']
    }

  ];
  addFormul: any;
  errorMessage = "";
  stateGroupOptions: Observable<StateGroup[]>;

  displayName: string;
  text = "kk";
  description: string;
  myControl = new FormControl();

  filteredOptions: Observable<User[]>;
  buildFormulCmb: any[];
  getCalculatedCombo: any;
  constructor(private configService: ConfigService,
    public dialogRef: MatDialogRef<any>,
    private CalculatedFormulDependantTOCourse: CalculatedDependantToCourseService,
    public commonService: CommonService,
    private fb: FormBuilder) {
    this.addFormul = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    //  items: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getFromServer();
  }

  addItem() {
    this.activeItems.push({
      label: " "
    })
    console.log(this.activeItems)
  }
  removeItem() {
    this.activeItems.pop()
  }
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  displayFn(user?: User): string | undefined {

    if (user) {
      this.text = user.toString();
      console.log("this.textfn", this.text);
    }
    return user ? user.name : undefined;
  }
  mhd(text) {
    if (text != "") {
      this.text = text;
      console.log("this.activeItems", this.activeItems);
    }
  }

  public addCalculatedFormul() {

    this.activeItems.forEach(activeItem => {
      this.getCalculatedCombo.forEach(eachCalculatedCombo => {
        if (eachCalculatedCombo.displayName == activeItem.label) {
          activeItem.label = eachCalculatedCombo.columnName
        }
      });
    });
    let formula = ""
    let showFormula = ""
    let jsonFormula = [];
    let usedList = ",";
    let totalUsedList = ",";
    this.activeItems.forEach(activeItem => {


      let f = activeItem.label
      this.getCalculatedCombo.forEach(eachCalculatedCombo => {
        if (eachCalculatedCombo.columnName == activeItem.label) {
          f = "(" + eachCalculatedCombo.formula + ")"
        }
      });
      formula += f + " "

      let sf = activeItem.label
      this.getCalculatedCombo.forEach(eachCalculatedCombo => {
        if (eachCalculatedCombo.columnName == activeItem.label) {
          sf = eachCalculatedCombo.displayName
        }
      });
      showFormula += sf + " "


      let jf = activeItem.label
      this.getCalculatedCombo.forEach(eachCalculatedCombo => {
        if (eachCalculatedCombo.columnName == activeItem.label) {
          jf = eachCalculatedCombo.columnName
        }
      });
      let obj = {};
      obj['v'] = jf
      jsonFormula.push(obj)


      this.getCalculatedCombo.forEach(eachCalculatedCombo => {
        if (eachCalculatedCombo.columnName == activeItem.label) {
          usedList += eachCalculatedCombo.columnName + ",";
        }
      });

      this.getCalculatedCombo.forEach(eachCalculatedCombo => {
        if (eachCalculatedCombo.columnName == activeItem.label) {
          totalUsedList += eachCalculatedCombo.totalUsedList + ",";
        }
      });
      totalUsedList += "," + usedList

    });

    let splitTotalUsedList = totalUsedList.split(",");
    var filtered = splitTotalUsedList.filter(function (el) {
      return el != "";
    });
    var unique = filtered.filter(onlyUnique);
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    if (this.addFormul.valid && formula!=" " ) {
//debugger
      let body = {
        DisplayName: this.displayName, Description: this.description, Formula: formula, ShowFormula: showFormula,
        UsedList: usedList, TotalUsedList: unique.toString(), JsonFormula: JSON.stringify(jsonFormula)
      }

      this.configService.post("addCalculatedFormulDependentToCourse", body).subscribe(
        (data) => {
          this.commonService.showEventMessage("فرمول با موفقیت ذخیره شد", 5000)
          console.log('data', data)
          this.dialogRef.close();
        },
        (error) => {
          this.commonService.showEventMessage(error.error.ExceptionMessage, 300000)
          console.log('ere', error)
          this.dialogRef.close();
        }
      )
    }
    else {
      this.errorMessage = "همه موارد باید تکمیل گردد."
    }
  }


  private getFromServer() {
    this.CalculatedFormulDependantTOCourse.getCalculatedDependantToCourseServicecombo()
      .subscribe(
        (sucsess) => {
          ////////debugger
          this.buildFormulCmb = [];
          let a = JSON.parse(sucsess)
          this.getCalculatedCombo = JSON.parse(sucsess)
          a.forEach(e => {
            let temp = {};
            if (!temp['letter']) {
              temp['letter'] = '';
            }
            //temp['backgroundFormul']=e.formula;
            temp['names'] = [];
            temp['names'].push(
              e.displayName
            );
            this.buildFormulCmb.push(temp)

          });
          this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filterGroup(value))
            );

          this.stateGroups = this.stateGroups.concat(this.buildFormulCmb)

          console.log('sucsess', JSON.parse(sucsess))
          console.log('this.stateGroup', this.stateGroups)
        })
  }

}
