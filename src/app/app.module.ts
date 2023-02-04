import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, JsonpClientBackend } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { BlogComponent } from './blog/blog.component';
import { SpotifyApiComponent } from './spotify-api/spotify-api.component';
import { CommonModule } from '@angular/common';
import { ArticlelistComponent } from './articlelist/articlelist.component';
import { ArticleComponent } from './article/article.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { AuthorizationService } from './service/authorization.service';
import { SpotifyMainComponent } from './spotify-main/spotify-main.component';
import { SpotifySearchComponent } from './spotify-search/spotify-search.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AllProductsComponent,
    BlogComponent,
    SpotifyApiComponent,
    ArticlelistComponent,
    ArticleComponent,
    SpotifyLoginComponent,
    SpotifyMainComponent,
    SpotifySearchComponent,
    PageErrorComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
  ],
  providers: [Document, { provide: JsonpClientBackend, useClass: HttpClientJsonpModule }],
  bootstrap: [AppComponent]
})
export class AppModule { }
