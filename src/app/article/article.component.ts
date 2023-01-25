import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ARTICLES } from 'src/assets/data';
import { ARTICLE, ARTICLEINFO } from 'src/assets/interface';
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

  showConfig() {
    // this.articleService.getConfig()
    // .subscribe({
    //   // console.log(data)
    //   // id: data.id,
    //   // title: data.title,
    //   next: (data:ARTICLEINFO) => this.articleInfo = {
    //     id: data.id,
    //     title: data.title,
    //     category: data.category,
    //     content: data.content,
    //   }, // success path
    //   error: error => this.error = error, // error path
    // });
    // console.log(this.articleInfo);
  }

  // showQueryData() {
  //   this.articleService.getArticleTest('01');
  // }
}
