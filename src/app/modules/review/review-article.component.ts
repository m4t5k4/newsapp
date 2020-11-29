import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core/service/alert.service';
import { Article } from '../../data/schema/article.model';
import { ArticleService } from '../../data/service/article.service';

@Component({ templateUrl: 'review-article.component.html' })
export class ReviewArticleComponent implements OnInit {
    id: number;
    loading = false;
    article: Article;
    submitted = false;

    constructor(
        private alertService: AlertService,
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit (): void {
        this.id = parseInt(this.route.snapshot.params['id']);//parse
        this.articleService.getById(this.id)
            .pipe(first())
            .subscribe(x => this.article = x);
    }

    public publish() {
        this.submitted = true;
        this.article.articleStatusID = 1;
        this.articleService.updateArticle(this.id, this.article)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
    
}