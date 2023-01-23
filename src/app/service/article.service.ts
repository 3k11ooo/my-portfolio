import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ARTICLES } from '../../assets/data';
import { ARTICLE, ARTICLEINFO } from 'src/assets/interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  article : ARTICLE | undefined;
  articleInfo = ARTICLES;
  aritcleInfoUrl = 'assets/articles/index.json';

  constructor(private http: HttpClient) { }
  ngOnInit(){
  }


  getConfig() {
    return this.http.get<ARTICLEINFO>(this.aritcleInfoUrl);
  }

  getArticleTest(id: string){
    const id_num = Number(id);
    this.articleInfo.forEach((value: ARTICLEINFO, index: number, array:ARTICLEINFO[]) => {
      if(index == id_num)
        console.log(value)
    });
  }



  getArticle(id: string){

    return  new Promise((resolve, reject) => {
 
      const url = "assets/articles/" + id + ".html";
      
      // article : ARTICLE | undefined;
      // this.article.id = id;
 
      // const extractData = (res: Response) => {
      //   if (res.status < 200 || res.status >= 300) {
      //     throw new Error('Bad response status: ' + res.status);
      //   }
        
      //   this.getArticleInfos().subscribe((articleInfos: ARTICLEINFO[]) =>{
      //     let info = articleInfos.filter(article => article.id === id)[0];
      //     article.title = info.title;
      //     article.content = res.text();
      //     resolve(article);
      //   });
      // }
      //   const handleNotFound = () => {
      //     article.title = '404 NOT FOUND';
      //     article.content = '';
      //     resolve(article);
      //   };
   
      //   this.http.get(url).subscribe(extractData, handleNotFound);
      });
    }

     
  // getArticleInfos (): Observable<ARTICLEINFO[]> {
 
  //   const extractData = (res: Response) => {
  //     if (res.status < 200 || res.status >= 300) {
  //       throw new Error('Bad response status: ' + res.status);
  //     }
  //     return res.json() || { };
  //   }
 
  //   const handleError = (error: any) => {
  //     let errMsg = error.message || 'Server error';
  //     console.error(errMsg); // log to console instead
  //     return Observable.(errMsg);
  //   }
 
  //   return this.http.get('src/assets/data/articles/index.json')
  //     .subscribe()
  //     .map(extractData)
  //     .catch(handleError);
  // }
  
}


