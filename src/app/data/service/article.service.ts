import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../schema/article.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArticleViewModel } from '../schema/article-view.model';

const URL = "https://localhost:5001/api/article"

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public article: Article;
 
  constructor(private http: HttpClient) { }

  getAll (): Observable<Article[]> {
    return this.http.get<Article[]>(URL)
  }

  getById (id: number) {
    return this.http.get<Article>(`${environment.apiUrl}/article/${id}`)
  }


  addArticle (article: ArticleViewModel) {
    return this.http.post<Article>(URL, article);
  }

  updateArticle (articleID: number, article: Article) {
    return this.http.put<Article>("https://localhost:5001/api/article/" + articleID, article);
  }

  deleteArticle (articleID: number) {
    return this.http.delete<Article>("https://localhost:5001/api/article/" + articleID);
  }
}
