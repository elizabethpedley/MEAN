import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: 'new',component: AddComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: '',component: HomeComponent },
  { path: 'notFound',component: NotfoundComponent },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
