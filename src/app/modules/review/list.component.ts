import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ArticleService } from '../../data/service/article.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    articles = null;

    constructor(private articleService: ArticleService) { }

    ngOnInit () {
        this.articleService.getAll()
            .pipe(first())
            .subscribe(articles => this.articles = articles);
    }

    deleteArticle (id: number) {
        const article = this.articles.find(x => x.id === id);
        article.isDeleting = true;
        this.articleService.deleteArticle(id)
            .pipe(first())
            .subscribe(() => this.articles = this.articles.filter(x => x.id !== id));
    }
}