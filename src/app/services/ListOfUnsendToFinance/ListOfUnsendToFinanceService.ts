import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ListOfUnsendToFinanceService {

  constructor(public configService:ConfigService,
    public commonService:CommonService) { }

public getListOfFinance():Observable<any>{
  return this.configService.get('listOfUnsendToFinance/'+this.commonService.termId);
}

public postListOfFinance(body):Observable<any>{
  return this.configService.post('listOfUnsendToFinance',body);
}




  
}
