import { Routes } from '@angular/router';
import { SpaceComponent } from './pages/space/space.component';
import { NavComponent } from './pages/nav/nav.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DataLoadGuard } from './data-preload.guard';
export const routes: Routes = [
  {
    path: '',
    component: SpaceComponent,
    pathMatch: 'full',
    canActivate: [DataLoadGuard],
  },
  {
    path: 'nav/:category/:type',
    component: NavComponent,
    canActivate: [DataLoadGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
