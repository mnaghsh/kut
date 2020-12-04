import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherDetailService {

  constructor(public configService:ConfigService) { }

// public getUsers():Observable<any>{
//   return this.configService.get('teacherDetail');
// }
// public updateUsers(id):Observable<any>{
  
//   return this.configService.get('teacherDetail/'+id);
// }
public saveTeacherDetail(body):Observable<any>{
  return this.configService.post('teacherDetail',body);
}
// public checkDuplicateUser(body):Observable<any>{
//   return this.configService.post('teacherDetail',body);
// }

  
}
