import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionSelectionComponent } from './collection-selection/collection-selection.component';
import { MainTablesComponent } from './main-tables/main-tables.component';

const routes: Routes = [
  { path: "", component: CollectionSelectionComponent },
  { path: "tables", component: MainTablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
