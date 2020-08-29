import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public configService:ConfigService) { }

public getListOfcategorys():Observable<any>{
  return this.configService.get('department');
}




  
}
