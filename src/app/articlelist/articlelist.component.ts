import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from '../../assets/interface';
import { ARTICLES } from 'src/assets/blogs/blogs-data';
import { HTMLBLOCK, HTMLNONE } from 'src/assets/data';
import { BlogComponent } from '../blog/blog.component';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-articlelist', // my-articlelist
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent {
  articleList = ARTICLES;
  articleListStyle = HTMLBLOCK;
  errorStyle = HTMLNONE;
  error: string = '';

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private blog: BlogComponent,
  ){}

  ngOnInit(){
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticleInfos()
    .subscribe({
      next: (articles : ARTICLEINFO[]) => {
        if(articles.length < 1){
          this.errorStyle = HTMLBLOCK;
          this.error = 'まだ記事がありません。'
        }
        this.articleList = articles;
        this.blog.articles = articles;
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
