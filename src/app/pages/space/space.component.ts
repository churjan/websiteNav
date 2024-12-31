import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { CommonService } from '@shared/services/common.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.less',
})
export class SpaceComponent implements OnInit {
  isEdit = false;

  get spaceList() {
    return this.cs.spaceList;
  }

  constructor(private router: Router, public cs: CommonService) {}

  ngOnInit(): void {}

  onJump(item) {
    const spaceId = item.documentId;
    const categoryId = item.primary_categories[0]?.documentId;
    this.router.navigate(['nav'], { queryParams: { spaceId, categoryId } });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.spaceList, event.previousIndex, event.currentIndex);
    console.log(this.spaceList);
  }
}
