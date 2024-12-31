import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../shared/services/common.service';
import qs from 'qs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.less',
})
export class NavComponent implements OnInit {
  spaceId = '';
  categoryId = '';

  get navList() {
    return (
      this.cs.spaceList.find((item) => item.documentId === this.spaceId)
        ?.primary_categories ?? []
    );
  }

  get websiteList() {
    return (
      this.navList.find((item) => item.documentId === this.categoryId)?.list ??
      []
    );
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public cs: CommonService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.spaceId = paramMap.get('spaceId');
      this.categoryId = paramMap.get('categoryId');
    });
  }

  onNavItemClick(categoryId) {
    this.router.navigate(['/nav'], {
      queryParams: { spaceId: this.spaceId, categoryId },
    });
  }
}
