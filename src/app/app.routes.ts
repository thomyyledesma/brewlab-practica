import { Routes } from '@angular/router';
import { PageList } from './devices/features/page-list/page-list';
import { PageDetails } from './devices/features/page-details/page-details';
import { PageForm } from './devices/features/page-form/page-form';

export const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: PageList },
  { path: 'devices/:id', component: PageDetails },
  { path: 'add', component: PageForm },
  { path: '**', redirectTo: 'devices' },
];
