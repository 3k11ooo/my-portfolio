import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from '../../assets/interface';
import { ARTICLES } from 'src/assets/blogs/blogs-data';
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
    this.articleService.getArticleInfos()
    .subscribe({
      next: (articles : ARTICLEINFO[]) => {
        this.articles = articles;
      },
      error: (e)=> {
        switch (e.status) {
          default:
            console.log(`エラーが発生しました。管理者にご連絡ください。error code: ${e.status}`, e)
            break;
        }
      }
    });
  }

}
