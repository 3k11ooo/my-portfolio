import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from '../../assets/interface';
import { ARTICLES } from 'src/assets/blogs/blogs-data';
import { HTMLBLOCK, HTMLNONE } from 'src/assets/data';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-articlelist', // my-articlelist
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent {
  articles = ARTICLES;
  articleListStyle = HTMLBLOCK;
  errorStyle = HTMLNONE;
  error: string = '';

  constructor(
    private router: Router,
    private articleService: ArticleService
  ){}

  ngOnInit(){
    if(this.articles.length < 1){
      this.errorStyle = HTMLBLOCK;
      this.error = 'まだ記事がありません。'
    }
  }
}
