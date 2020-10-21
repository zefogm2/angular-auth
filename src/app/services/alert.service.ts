import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
private subject:Subject<any>=new Subject();
private keepAfterRouteChange=false;
  constructor(
    private router:Router
  ) {
    this.router.events.subscribe(
      (event)=> {
          if (event instanceof NavigationStart) {
            if (this.keepAfterRouteChange) {
                this.keepAfterRouteChange=false;
            } else {
              this.clear();
            }
          }
      }
    )
  }


  public error(message:string,keepAfterRouteChange=false) {
    this.keepAfterRouteChange=keepAfterRouteChange;
    this.subject.next({typs:"error",text:message});
 }

  public success(message:string,keepAfterRouteChange=false) {
     this.keepAfterRouteChange=keepAfterRouteChange;
     this.subject.next({typs:"success",text:message});
  }

  public getAlert():Observable<any> {
      return this.subject.asObservable();
  }
  public clear() {
    this.subject.next();
  }
}
