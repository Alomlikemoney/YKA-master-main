import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'messaging',
        loadChildren: () => import('./messaging/messaging.module').then( m => m.MessagingPageModule)
      },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'signup-page',
    loadChildren: () => import('./signup-page/signup-page.module').then( m => m.SignupPagePageModule)
  },
  {
    path: 'create-annonce',
    loadChildren: () => import('./create-annonce/create-annonce.module').then( m => m.CreateAnnoncePageModule)
  },
  {
    path: 'profil-page',
    loadChildren: () => import('./profil-page/profil-page.module').then( m => m.ProfilPagePageModule)
  },
  {
    path: 'page-recherche',
    loadChildren: () => import('./page-recherche/page-recherche.module').then( m => m.PageRecherchePageModule)
  },
  {
    path: 'gest-annonce',
    loadChildren: () => import('./gest-annonce/gest-annonce.module').then( m => m.GestAnnoncePageModule)
  },
  {
    path: 'mes-annonces',
    loadChildren: () => import('./mes-annonces/mes-annonces.module').then( m => m.MesAnnoncesPageModule)
  }
],
},
{
  path: '',
  redirectTo: 'tabs/home-page',
  pathMatch: 'full',
},
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'mes-annonces',
    loadChildren: () => import('./mes-annonces/mes-annonces.module').then( m => m.MesAnnoncesPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
 
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
