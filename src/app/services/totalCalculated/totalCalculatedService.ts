import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class totalCalculatedService {

  constructor(public configService:ConfigService) { }

public getTotalCalculatedServiceGrid():Observable<any>{
  return this.configService.get('addCalculatedTotalFormul');
}

public getTotalCalculatedServicecombo():Observable<any>{
  return this.configService.get('addTotalItemCombo');
}
  
}
