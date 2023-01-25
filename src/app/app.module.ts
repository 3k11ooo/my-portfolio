import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { BlogComponent } from './blog/blog.component';
import { SpotifyApiComponent } from './spotify-api/spotify-api.component';
import { CommonModule } from '@angular/common';
import { ArticlelistComponent } from './articlelist/articlelist.component';
import { ArticleComponent } from './article/article.component';
import { FooterComponent } from './footer/footer.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { AuthorizationService } from './service/authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AllProductsComponent,
    BlogComponent,
    SpotifyApiComponent,
    ArticlelistComponent,
    ArticleComponent,
    FooterComponent,
    SpotifyLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [Document],
  bootstrap: [AppComponent]
})
export class AppModule { }
