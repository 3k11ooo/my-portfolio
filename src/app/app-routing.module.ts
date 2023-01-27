import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AllProductsComponent} from './all-products/all-products.component';
import { BlogComponent } from './blog/blog.component';
import { SpotifyApiComponent } from './spotify-api/spotify-api.component';
import { ArticleComponent } from './article/article.component';
import { ArticlelistComponent } from './articlelist/articlelist.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { SpotifyMainComponent } from './spotify-main/spotify-main.component';
import { SpotifySearchComponent } from './spotify-search/spotify-search.component';

const routes: Routes = [
  { path:'top', component: MainComponent, title: '3k11' },
  { path:'all-products', component: AllProductsComponent, title: '3k11-Protfolio'},
  { path: 'spotify-api', component: SpotifyApiComponent, title: '3k11-SpotifyAPI',
    children:[
      { path: 'spotify-login', component: SpotifyLoginComponent, title: '3k11-SpotifyAPI-Login'},
      { path: 'spotify-main', component: SpotifyMainComponent, title: '3k11-SpotifyAPI-Main',
        children: [
          { path: 'spotify-search', component: SpotifySearchComponent, title: '3k11-SpotifyAPI-Search'},
        ]
      }
    ]
  },
  { path:'blogs', component: BlogComponent, title: '3k11-Blogs',
    children:[
      { path: 'article', component: ArticleComponent, title: '3k11-blogs-article'},
      { path: '**', component: ArticlelistComponent, title: '3k11-blogs-top'},
    ],
  },
  // { path:'spotify-api', component: SpotifyApiComponent, title: '3k11-SpotifyAPI'},
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
