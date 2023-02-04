import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  constructor(
    private ser: TestService,
    private http: HttpClient
  ) {}

  startClick(): void {
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
