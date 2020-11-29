import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { WriteRoutingModule } from './write-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, ListComponent, AddEditComponent],
  imports: [
    CommonModule,
    WriteRoutingModule,
    SharedModule
  ]
})
export class WriteModule { }
