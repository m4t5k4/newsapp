import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TagsRoutingModule } from './tags-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';

@NgModule({
    declarations: [LayoutComponent, ListComponent, AddComponent],
    imports: [
        CommonModule,
        TagsRoutingModule,
        SharedModule
    ]
})
export class TagsModule { }
