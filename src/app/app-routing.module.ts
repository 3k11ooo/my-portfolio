import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AllProductsComponent} from './all-products/all-products.component';
import { BlogComponent } from './blog/blog.component';
import { SpotifyApiComponent } from './spotify-api/spotify-api.component';

const routes: Routes = [
  { path:'top', component: MainComponent, title: '3k11' },
  { path:'all-products', component: AllProductsComponent, title: '3k11-Protfolio', 
    children:[
      { path: 'spotify-api', component: SpotifyApiComponent, title: '3k11-SpotifyAPI'},
    ],
},

  { path:'blogs', component: BlogComponent, title: '3k11-Blogs' },
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
