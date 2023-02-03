import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsynchronousService {

  constructor() { }

  // observable
  public getData(func:any): any {
    const obj: any = new Observable(observer => {
      setTimeout(() => {
        observer.next(func);
        observer.next();
        observer.next();
        observer.complete();
      }, 1000);
    });
    return obj;
  }
}
