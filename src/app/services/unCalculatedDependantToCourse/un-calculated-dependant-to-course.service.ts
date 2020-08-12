import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnCalculatedDependantToCourseService {

  constructor(public configService:ConfigService) { }

public getUnCalculatedDependantToCourseServiceGrid():Observable<any>{
  return this.configService.get('addUnCalculatedFormulDependantToCourse');
}


public deleteUnCalculatedDependantToCourseServiceGrid(showFormula):Observable<any>{
  return this.configService.delete('addUnCalculatedFormulDependantToCourse/'+showFormula);
}

  
}
