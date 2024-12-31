import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, catchError, tap, of, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '@env/environment.development';
import qs from 'qs';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  hasFetched = false;
  spaceList = [];

  defaultIconUrl =
    'https://ts1.cn.mm.bing.net/th?id=ODLS.A2450BEC-5595-40BA-9F13-D9EC6AB74B9F&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2';

  constructor(private http: HttpClient, private message: NzMessageService) {}

  fetchSpaceList() {
    const queryString = qs.stringify(
      {
        sort: ['order:asc'],
        populate: {
          primary_categories: {
            sort: ['order:asc'],
          },
        },
      },
      { encodeValuesOnly: true }
    );
    const url = `spaces?${queryString}`;
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}${url}`).subscribe({
        next: (res: any) => {
          this.spaceList = res.data;
          this.hasFetched = true;
          resolve(true);
        },
        error: () => {
          reject(false);
        },
      });
    });
  }

  getDocuments(url) {
    return this.http.get(`${environment.apiUrl}${url}`);
  }

  getDocument(url, key) {
    return this.http.get(`${environment.apiUrl}${url}/${key}`);
  }

  createDocument(url, data) {
    return this.http.post(`${environment.apiUrl}${url}`, data);
  }

  updateDocument(url, key, data) {
    return this.http.put(`${environment.apiUrl}${url}/${key}`, data);
  }

  deleteDocument(url, key) {
    return this.http.delete(`${environment.apiUrl}${url}/${key}`);
  }
}
