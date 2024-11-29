import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { CommonService } from '@shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.less',
})
export class SpaceComponent implements OnInit {
  constructor(
    private router: Router,
    public cs: CommonService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.fetchList();
  }

  fetchList() {
    this.http.get(`${environment.apiUrl}spaces`).subscribe((data) => {
      console.log(data);
    });
  }

  onJump(item) {
    const category = item.path;
    const type = this.cs.navList[item.path][0].path;
    this.router.navigate(['/nav', category, type]);
  }
}
