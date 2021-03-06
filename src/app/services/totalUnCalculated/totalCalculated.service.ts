import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class totalUnCalculatedService {

  constructor(public configService:ConfigService) { }

public getUnCalculatedTotalFormulControllerGrid():Observable<any>{
  return this.configService.get('addUnCalculatedTotalFormul');
}

public getCalculatedDependantToCourseServicecombo():Observable<any>{
  return this.configService.get('addItemCombo');
}
  
}
