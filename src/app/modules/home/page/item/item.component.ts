import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/data/schema/article.model';
import { ArticleService } from 'src/app/data/service/article.service';
import { ImageService } from '../../../../data/service/image.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() article: Article;
  src: string;

  constructor(private imageService: ImageService,
    private articleService: ArticleService) {
  }

  ngOnInit(): void {
    const path = this.imageService.getImage(this.article.imageID)
    .subscribe((image) => this.src = image.path);
  }

  passArticle() {
    this.articleService.article = this.article;
    console.log(this.articleService.article);
  }

}
