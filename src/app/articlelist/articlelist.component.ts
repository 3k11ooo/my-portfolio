import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ARTICLEINFO } from '../../assets/interface';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'my-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent {
  // @Input('displayMode') mode: string

  // articles: ARTICLEINFO[];

  // constructor(
  //   private router: Router,
  //   private articleService: ArticleService){}

  // ngOnInit(){
  //   this.getArticles();
  // }

  // getArticles(){
  //   this.articleService.getArticleInfos().subscribe((articles: ARTICLEINFO[]) => this.articles = articles);
  // }

  // gotoArticle( id:string ) {
  //   let link = ['Article', { id: id }];
  //   this.router.navigate(link);
  // }



}
