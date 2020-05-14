import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@core';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [CoreModule, FormsModule, ReactiveFormsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
