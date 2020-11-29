import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core/service/alert.service';
import { Article } from '../../data/schema/article.model';
import { ArticleService } from '../../data/service/article.service';
import { ImageService } from '../../data/service/image.service';
import { AccountService } from '../../core/service/account.service';
import { User } from 'src/app/data/schema/user.model';

@Component({ templateUrl: 'view-article.component.html',
styleUrls: ['view-article.component.scss'] })
export class ViewArticleComponent implements OnInit {
    id: number;
    loading = false;
    article: Article;
    submitted = false;
    src: string;
    articleLoaded: Promise<Article>;
    user: User;

    constructor(
        private alertService: AlertService,
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private router: Router,
        private imageService: ImageService,
        private accountService: AccountService
    ) { }

    ngOnInit (): void {
        console.log(this.articleService.article);
        this.article = this.articleService.article;

        /* this.id = parseInt(this.route.snapshot.params['id']);//parse
        this.articleService.getById(this.id)
            .pipe(first())
            .subscribe((article) => {
                this.article = article;
                this.articleLoaded = Promise.resolve(article);
            }); */
        this.imageService.getImage(this.article.imageID)
            .subscribe((image) => this.src = image.path);

        this.accountService.getById(this.article.userID).subscribe(x => this.user = x);
        
    }

}