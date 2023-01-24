import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from '../../assets/interface';
import { ARTICLES } from 'src/assets/data';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-articlelist', // my-articlelist
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent {
  // @Input('displayMode') mode: string

  articles = ARTICLES;

  constructor(
    private router: Router,
    private articleService: ArticleService){}

  ngOnInit(){
    this.getArticles();
  }

  getArticles(){
    this.articleService.getArticleInfos().subscribe((articles : ARTICLEINFO[]) => this.articles = articles);
  }

  // gotoArticle( id:string ) {
  //   let link = ['Article', { id: id }];
  //   this.router.navigate(link);
  // }



}
