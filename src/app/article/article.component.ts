import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ARTICLE, ARTICLEINFO } from 'src/assets/interface';
import { HTMLBLOCK, HTMLNONE } from 'src/assets/data';
import { ARTICLES } from 'src/assets/blogs/blogs-data';
import { ArticleService } from '../service/article.service';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-article', //app-article
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articleInfo: ARTICLEINFO | undefined;
  articles: ARTICLEINFO[] = [];
  content: string = ''
  categoryQuery: string = '';
  error: any;
  errorStyle: any = HTMLNONE;
  contentStyle: any = HTMLBLOCK;
  footerStyle: any = HTMLBLOCK;
  constructor(
    private routeParams: ActivatedRoute,
    private articleService: ArticleService,
    private blog: BlogComponent,
  ){}

  ngOnInit(){
    this.getAritcleContent();
  }
  
  getAritcleContent(): void{
    this.content = '';
    let id = '';
    let title = '';
    // routeのクエリパラメータから'id'を取得
    this.routeParams.queryParams.subscribe(
      (query: any) => {
        id = query['id'];
        title = query['title'];
        this.categoryQuery = query['category'];
      });
    // footerに関連記事を表示
    this.getFooterInfo(this.categoryQuery, title);
    // 記事のhtmlのデータを格納
    this.articleService.getArticle(id)
    .subscribe({
      next: (data: any) => {
        this.content = data;
      },
      error: (e)=> {
        this.contentStyle = HTMLNONE;
        this.errorStyle = HTMLBLOCK;
        switch (e.status) {
          default:
            this.error = `エラーが発生しました。管理者にご連絡ください。error code: ${e.status}`;
            console.log(`error code: ${e.status}`, e)
            break;
        }
      }
    });
  }

  getFooterInfo(categoryName: string, titleName: string):void {
    this.articles = [];
    const articleList = this.blog.articles;
    for(let i=0; i<articleList.length; i++){
      for(let j=0; j<articleList[i].category.length; j++){
        if(articleList[i].category[j] == categoryName && articleList[i].title != titleName){
          this.articles.push(articleList[i]);
        }
      }
    }
    if(this.articles.length < 1)  this.footerStyle = HTMLNONE;
    else this.footerStyle = HTMLBLOCK;
  }
}
