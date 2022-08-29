import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPage } from '../detail/detail.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {  path: '',  component: HomePage },
  { path: 'detail', component: DetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
