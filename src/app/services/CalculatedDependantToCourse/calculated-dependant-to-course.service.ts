import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatedDependantToCourseService {

  constructor(public configService:ConfigService) { }

public getCalculatedDependantToCourseServiceGrid():Observable<any>{
  return this.configService.get('addCalculatedFormulDependentToCourse');
}


public deleteCalculatedDependantToCourseServiceGrid(columnName):Observable<any>{
  return this.configService.delete('addCalculatedFormulDependentToCourse/'+columnName);
}


public getCalculatedDependantToCourseServicecombo():Observable<any>{
  return this.configService.get('addItemCombo');
}
  
}
