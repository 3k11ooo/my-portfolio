import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ARTICLES } from 'src/assets/blogs/blogs-data';
import { ARTICLE, ARTICLEINFO } from 'src/assets/interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  article : ARTICLE | undefined;
  articleInfo = ARTICLES;
  aritcleInfoUrl = 'assets/articles/index.json';

  constructor(private http: HttpClient) { }
  ngOnInit(){
  }

  getArticle(id: string){
  }


  getArticleInfos (){
    return this.http.get<ARTICLEINFO[]>(this.aritcleInfoUrl);
  }
  
}


