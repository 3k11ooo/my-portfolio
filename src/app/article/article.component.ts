import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from 'src/assets/interface';
import { ARTICLES } from 'src/assets/blogs/blogs-data';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-article', //app-article
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articleInfo: ARTICLEINFO | undefined;
  article: ARTICLE | undefined;
  error: any;
  constructor(
    private routeParams: ActivatedRoute,
    private articleService: ArticleService
  ){}

  ngOnInit(){
    // routeのクエリパラメータから'id'を取得
    this.routeParams.queryParams.subscribe((query) => console.log(query));
    
    // 記事のhtmlのデータを格納
    // this.articleService.getArticle(this.myQuery).then((article: ARTICLE) => this.article = article);
    // console.log(this.articleService.articleInfo);
  }
}
