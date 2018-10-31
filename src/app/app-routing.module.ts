import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasonryComponent } from './masonry/masonry.component';
import { TreeComponent } from './tree/tree.component';
import { TableComponent } from './table/table.component';
import { MyTableComponent } from './my-table/my-table.component';

const routes: Routes = [
  { path: '', component: TreeComponent},
  { path: 'table', component: TableComponent},
  { path: 'my-table', component: MyTableComponent },
  { path: 'masonry', component: MasonryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
