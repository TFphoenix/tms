import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PredefinedBreakfastComponent } from './pages/predefined-breakfast/predefined-breakfast.component';
import { CustomizeBreakfastComponent } from './pages/customize-breakfast/customize-breakfast.component';
import { SharedModule } from './shared/shared.module';
import { ExploreBreakfastComponent } from './pages/explore-breakfast/explore-breakfast.component';
import { ApiService } from './services/api/api.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PredefinedBreakfastComponent,
    CustomizeBreakfastComponent,
    ExploreBreakfastComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
