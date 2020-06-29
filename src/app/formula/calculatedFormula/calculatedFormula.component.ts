import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
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
      letter: 'پرانتز',
      names: ['(', ')']
    },

    {
      letter: 'عملگرها',
      names: ['+', '-', '*', '/', '%']
    }, {
      letter: 'مقایسه گرها',
      names: ['<', '>', '<=', '>=', '=', '<>']
    }, {
      letter: 'شرط ها',
      names: ['case when', 'then', 'else', 'end']
    }
    // , {
    //   letter: 'D',
    //   names: ['Delaware']
    // }, {
    //   letter: 'F',
    //   names: ['Florida']
    // }, {
    //   letter: 'G',
    //   names: ['Georgia']
    // }, {
    //   letter: 'H',
    //   names: ['Hawaii']
    // }, {
    //   letter: 'I',
    //   names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
    // }, {
    //   letter: 'K',
    //   names: ['Kansas', 'Kentucky']
    // }, {
    //   letter: 'L',
    //   names: ['Louisiana']
    // }, {
    //   letter: 'M',
    //   names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
    //     'Minnesota', 'Mississippi', 'Missouri', 'Montana']
    // }, {
    //   letter: 'N',
    //   names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    //     'New Mexico', 'New York', 'North Carolina', 'North Dakota']
    // }, {
    //   letter: 'O',
    //   names: ['Ohio', 'Oklahoma', 'Oregon']
    // }, {
    //   letter: 'P',
    //   names: ['Pennsylvania']
    // }, {
    //   letter: 'R',
    //   names: ['Rhode Island']
    // }, {
    //   letter: 'S',
    //   names: ['South Carolina', 'South Dakota']
    // }, {
    //   letter: 'T',
    //   names: ['Tennessee', 'Texas']
    // }, {
    //   letter: 'U',
    //   names: ['Utah']
    // }, {
    //   letter: 'V',
    //   names: ['Vermont', 'Virginia']
    // }, {
    //   letter: 'W',
    //   names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    // }
  ];

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
    private commonService: CommonService,
    private fb: FormBuilder) {

  }



  ngOnInit() {
    this.getFromServer();


  }




  addItem() {
    // //debugger
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
    // //debugger
    if (text != "") {
      // //debugger

      this.text = text;
      console.log("this.activeItems", this.activeItems);
    }
  }

  private addCalculatedFormul() {
    
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
    //debugger
    let splitTotalUsedList= totalUsedList.split(","); 
    var filtered = splitTotalUsedList.filter(function (el) {
      return el != "";
    });
    var unique = filtered.filter( onlyUnique );
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }
  
    let body = {
      DisplayName: this.displayName, Description: this.description, Formula: formula, ShowFormula: showFormula,
      UsedList: usedList, TotalUsedList: unique.toString(), JsonFormula: JSON.stringify(jsonFormula)
    }
    //debugger
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

 
  private getFromServer() {
    this.CalculatedFormulDependantTOCourse.getCalculatedDependantToCourseServicecombo()
      .subscribe(
        (sucsess) => {
          //debugger
          this.buildFormulCmb = [];
          let a = JSON.parse(sucsess)
          this.getCalculatedCombo = JSON.parse(sucsess)
          a.forEach(e => {
            let temp = {};
            if(!temp['letter']){
            temp['letter'] = 'آیتم های ثابت';
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
