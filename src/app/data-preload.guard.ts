import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonService } from './shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class DataLoadGuard implements CanActivate {
  constructor(private cs: CommonService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.cs.hasFetched) {
      return Promise.resolve(true);
    } else {
      return new Promise((resolve, reject) => {
        this.cs.fetchAllData().subscribe({
          next: () => resolve(true),
          error: () => reject(false),
        });
      });
    }
  }
}
