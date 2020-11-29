import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { ReviewArticleComponent } from './review-article.component';

@NgModule({
    declarations: [LayoutComponent, ListComponent, ReviewArticleComponent],
    imports: [
        CommonModule,
        ReviewRoutingModule,
        SharedModule
    ]
})
export class ReviewModule { }
