import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.less',
})
export class NavComponent implements OnInit {
  navList = [];
  websiteList = [];

  constructor(private route: ActivatedRoute, public cs: CommonService) {}

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');
    const navList = this.cs.navList[category];
    navList.forEach((item) => {
      item.urlPath = `/nav/${category}/${item.path}`;
    });
    this.navList = navList;

    this.route.params.subscribe((params) => {
      this.websiteList =
        this.cs.websiteList[params['category']][params['type']];
    });
  }
}
