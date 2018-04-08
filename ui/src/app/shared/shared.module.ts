import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddYearToAgePipe } from './add-year-to-age.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [],
  declarations: [AddYearToAgePipe]
})
export class SharedModule { }
