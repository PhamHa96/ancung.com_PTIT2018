import { FavoriteComponent } from './favorite/favorite.component';
import { UserComponent } from './user/user.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHomeComponent } from './view-home/view-home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FriendComponent } from './friend/friend.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InfoComponent } from './content/info/info.component';
import { HomeguardService } from './providers/homeguard.service';
import { AddLocationComponent } from './add-location/add-location.component';
import { GoogleMapComponent } from './google-map/google-map.component';

const routes: Routes = [
  {path: 'home', component: ViewHomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'listfriend', component: FriendComponent},
  {path: 'quanan/:id', component: InfoComponent},
  {path: 'addlocation', component: AddLocationComponent, canActivate: [HomeguardService]},
  {path: 'contact' , component: ContactComponent},
  {path: 'profile' , component: UserComponent},
  {path: 'favorite' , component: FavoriteComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
