import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PredefinedBreakfastComponent } from './pages/predefined-breakfast/predefined-breakfast.component';
import { CustomizeBreakfastComponent } from './pages/customize-breakfast/customize-breakfast.component';
import { SharedModule } from './shared/shared.module';
import { ExploreBreakfastComponent } from './pages/explore-breakfast/explore-breakfast.component';

@NgModule({
  declarations: [
    AppComponent,
    PredefinedBreakfastComponent,
    CustomizeBreakfastComponent,
    ExploreBreakfastComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
