import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, catchError, tap, of, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  hasFetched = false;
  spaceList;
  navList;
  websiteList;

  defaultIconUrl =
    'https://ts1.cn.mm.bing.net/th?id=ODLS.A2450BEC-5595-40BA-9F13-D9EC6AB74B9F&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2';

  constructor(private http: HttpClient, private message: NzMessageService) {}

  fetchAllData() {
    return forkJoin([
      this.fetchSpaceList(),
      this.fetchNavList(),
      this.fetchWebsiteList(),
    ]).pipe(
      tap((data) => {
        this.spaceList = data[0];
        this.navList = data[1];
        this.websiteList = data[2];
        this.hasFetched = true;
      }),
      catchError((error) => {
        this.message.error(error.message);
        return of(error);
      })
    );
  }

  fetchSpaceList() {
    return this.http.get('/configs/spaceList.json');
  }

  fetchNavList() {
    return this.http.get('/configs/navList.json');
  }

  fetchWebsiteList() {
    return this.http.get('/configs/websiteList.json');
  }
}
