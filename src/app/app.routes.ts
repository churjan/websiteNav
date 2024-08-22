import { Routes } from '@angular/router';
import { SpaceComponent } from './pages/space/space.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: SpaceComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
