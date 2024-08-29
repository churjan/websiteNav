import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.less',
})
export class SpaceComponent {
  constructor(private router: Router, public cs: CommonService) {}

  onJump(item) {
    const category = item.path;
    const type = this.cs.navList[item.path][0].path;
    this.router.navigate(['/nav', category, type]);
  }
}
