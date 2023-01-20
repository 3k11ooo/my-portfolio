import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AllProductsComponent} from './all-products/all-products.component';
import { BlogComponent } from './blog/blog.component';
import { SpotifyApiComponent } from './spotify-api/spotify-api.component';

const routes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path:'top', component: MainComponent, title: '3k11' },
  { path:'all-products', component: AllProductsComponent, title: '3k11-Protfolio' },
  { path:'blogs', component: BlogComponent, title: '3k11-Blogs' },
  { path:'spotify-api', component: SpotifyApiComponent, title: '3k11-SpotifyAPI'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
