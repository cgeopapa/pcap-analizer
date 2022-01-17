import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTablesComponent } from './main-tables/main-tables.component';

const routes: Routes = [
  { path: "", component: MainTablesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
