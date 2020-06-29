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

public getCalculatedDependantToCourseServicecombo():Observable<any>{
  return this.configService.get('addItemCombo');
}
  
}
