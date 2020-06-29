import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(public configService:ConfigService) { }

public getListOfTeachers():Observable<any>{
  return this.configService.get('users');
}




  
}
