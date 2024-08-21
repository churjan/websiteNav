import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.less',
})
export class SpaceComponent implements OnInit {
  spaceList;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('/configs/space.json').subscribe((data) => {
      this.spaceList = data;
    });
  }
}
