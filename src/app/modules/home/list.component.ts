import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Article } from '../../data/schema/article.model';
import { ArticleService } from '../../data/service/article.service';
@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    articles: Observable<Article[]>;

    constructor(private _articleService: ArticleService) {
        this.articles = this._articleService.getAll()
            .pipe(
                tap(a => console.log(a))
            );
    }

    ngOnInit (): void {
    }

}
