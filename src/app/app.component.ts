import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'websiteNav';
  constructor(private router: Router) {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const currentUrl = this.router.url;
        if (currentUrl !== '/') {
          this.router.navigate(['/']);
        }
      }
    });
  }
}
