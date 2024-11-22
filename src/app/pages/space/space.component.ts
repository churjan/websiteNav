import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.less',
})
export class SpaceComponent {
  constructor(
    private router: Router,
    public cs: CommonService,
    private http: HttpClient
  ) {
    this.http.get(`http://localhost:1337/api/spaces`).subscribe((data) => {
      console.log(data);
    });
  }

  onJump(item) {
    const category = item.path;
    const type = this.cs.navList[item.path][0].path;
    this.router.navigate(['/nav', category, type]);
  }
}
