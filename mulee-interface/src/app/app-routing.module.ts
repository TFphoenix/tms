import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomizeBreakfastComponent } from './pages/customize-breakfast/customize-breakfast.component';
import { ExploreBreakfastComponent } from './pages/explore-breakfast/explore-breakfast.component';
import { PredefinedBreakfastComponent } from './pages/predefined-breakfast/predefined-breakfast.component';

const routes: Routes = [
  {
    path: 'breakfast/predefined',
    component: PredefinedBreakfastComponent,
  },
  {
    path: 'breakfast/customize',
    component: CustomizeBreakfastComponent,
  },
  {
    path: 'breakfast/explore',
    component: ExploreBreakfastComponent,
  },

  { path: '**', redirectTo: 'breakfast/predefined' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
