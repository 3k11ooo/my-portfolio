import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from '../../assets/interface';
import { ARTICLES } from 'src/assets/data';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
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

}
