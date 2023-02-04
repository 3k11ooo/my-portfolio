import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor( private route: ActivatedRoute, private http: HttpClient,
    private jsonp: JsonpClientBackend,
    ) { }


  public challenges(): void {
    const nickname: string = '3k11';
    // const url: string = 'https://www.google.com?nickname=3k11';
    const url: string = 'http://challenge.z2o.cloud/challenges?nickname=3k11';
    this.http.post(url,{})
    .subscribe({
      next: (data: any) => {
      // id, actives_atが必要
      this.reFunc(data['actives_at'], data['id']);
      },
      error: (e: any) => {
        switch (e.status) {        
          default:
            console.log(e);
            break;
        }
      }
    });
  }

  private reFunc(num: number, id: string): void{
    const url = 'http://challenge.z2o.cloud/challenges';
    this.atTime(num, ()=>{
      this.http.put(url, {}, {
        headers: {
          'X-Challenge-Id' : id,
        }
      })
      .subscribe((data: any) => {
        if(data['total_diff'] < 500){
          // id, actives_atが必要
          this.reFunc(data['actives_at'], data['id']);
        }
        else console.log(data['result']);
      })
    });
  }


  private atTime(scheduledT: number, callback: () => void): void{
    const currentTime = new Date().getTime();
    const culcTime = scheduledT - currentTime;
    setTimeout(() => {
      callback();
    }, culcTime);
  }




}
