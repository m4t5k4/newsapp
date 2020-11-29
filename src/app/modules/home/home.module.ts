import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ViewArticleComponent } from './view-article.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { ItemComponent } from './page/item/item.component';

@NgModule({
    declarations: [LayoutComponent, ListComponent, ViewArticleComponent, ItemComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgxMasonryModule
    ]
})
export class HomeModule { }
