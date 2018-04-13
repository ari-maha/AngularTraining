import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitComponent } from './unit/unit.component';

const routes: Routes = [
  { path: '', component: UnitComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);