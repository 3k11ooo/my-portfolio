import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from 'src/assets/interface';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  articleInfo: ARTICLEINFO | undefined;
  error: any;
  constructor(
    private routeParams: ActivatedRoute,
    private articleService: ArticleService
  ){}

  ngOnInit(){
    // let id = this.routeParams.snapshot.paramMap.get('id');
    // this.articleService.getArticle(id).then((article: ARTICLE) => this.article = article);
    // console.log(this.articleService.articleInfo);
  }

  showConfig() {
    this.articleService.getConfig()
    .subscribe({
      // console.log(data)
      // id: data.id,
      // title: data.title,
      next: (data:ARTICLEINFO) => this.articleInfo = {
        id: data.id,
        title: data.title,
      }, // success path
      error: error => this.error = error, // error path
    });
    console.log(this.articleInfo);
  }




  // ngOnInit() {

  // }
}
